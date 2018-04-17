---
sidebarDepth: auto
footer: MIT Licensed | Copyright © 2018-present Evan You
---

# Tech Diary

## 2017/04/18

### VuePressについて

#vue, #vuepress

#### VuePress公式
<https://vuepress.vuejs.org/>

#### VuePress公式Github
<https://github.com/vuejs/vuepress>

#### VuePress参考動画  

<YoutubeEmbed videoId="XoReHBlSXqI"></YoutubeEmbed>

## 2017/04/17

### Dockerについて

#docker

#### はじめに
VagrantからDockerに開発環境を移行したものの、商用環境の設計・構築ができない・・・
というかDocker使ってやったことない。
ということで勉強するしかない

#### 参考資料
* https://www.slideshare.net/koda3/gcpdocker
* https://www.topgate.co.jp/gcp07-how-to-start-docker-image-gke
* https://www.wantedly.com/companies/wantedly/post_articles/27548


### Sorceryの注意点

#ruby, #RubyOnRails, #Sorcery

#### Sorceryの公式Github
https://github.com/Sorcery/sorcery

#### Sorceryで管理画面ユーザーを作成する際のポイントをメモ

* 既に一般ユーザーとしてUserモデルが存在している状態で、管理ユーザーとなるStaffモデルを作成
* 一般ユーザーはTwitterの外部連携を利用
* 管理ユーザーはseedから初期ユーザーを登録するので新規登録画面は作成しない

#### sorcery初期化（おさらい）
おさらいになりますが、sorceryの初期設定は以下のコマンドになります。
既にUserモデル作成で実行済みなので管理ユーザーを作成する際はスキップします。
```sh
$ rails generate sorcery:install
```

#### Staffモデル作成
Staffモデルは`rails g　model Staff`で通常のモデル作成と同じやり方をする

```sh
$ rails g　model Staff
```


■ マイグレーションファイル
```ruby
# 20180415xxxxxx_create_staffs.rb
class CreateStaffs < ActiveRecord::Migration[5.2]
  def change
    create_table :staffs, unsigned: true do |t|
      t.string :email,            null: true
      t.string :crypted_password
      t.string :salt
      t.timestamps                :null => false
    end
    add_index :staffs, :email
  end
end
```

■ Staff.rb
```ruby
＃ app／models/staff.rb
class Staff < ApplicationRecord
    authenticates_with_sorcery! do |config|
        config.username_attribute_names = [:email]
    end
end
```

■ User.rb  
ちなみにですが、Userモデルは以下のようになります
```ruby
＃ app／models/user.rb
class User < ApplicationRecord
    authenticates_with_sorcery! do |config|
        config.username_attribute_names = [:name]
        config.authentications_class = Authentication
    end
    ・・・
end
```


#### マイグレーション

```sh
$ rails db:migrate
```

#### Sorceryの設定
`config/initializers/corcery.rb`の設定についての注意点
* `username_attribute_names`はコメントアウトのまま、各モデルで定義する

```ruby
#config/initializers/corcery.rb
# --- user config ---
config.user_config do |user|
    # -- core --
    # specify username attributes, for example: [:username, :email].
    # Default: `[:email]`
    #
    # 
    # user.username_attribute_names =
    # user.username_attribute_names = [:name]
    ・・・

    # authentications_classの設定を読み込んで置かないと外部連携でエラーが発生する
    # Userモデルの設定値を読んでくれてないっぽい
    # https://github.com/Sorcery/sorcery/blob/master/lib/sorcery/model/submodules/external.rb
    user.authentications_class = Authentication
end

・・・

# user_classもデフォルト設定が必要。
# 管理ユーザーだとStaffになるのですが、設定の上書きはcontrollerで行う
config.user_class = 'User'
```

ユーザー毎に設定できるようにするにはどうしたらいいのか・・・


#### Controllerでuser_classを明示的に設定
私はユーザー画面と管理画面でnamespaceを分けています。  

* ユーザー画面 : Front
* 管理画面 : Admin

Controllerも`Front::ApplicationController` と `Admin::ApplicationController` で処理分けていますので、user_classをそれぞれ設定します。

■ ユーザー側
```ruby
# app/controllers/front/application_controller.rb
class Front::ApplicationController < ApplicationController
    layout "front/layouts/application"
  
    before_action :set_user_class, :set_locale, :init_timezone

    def set_user_class
        @user_class = User
    end

    ・・・
end
```

■ 管理側
```ruby
# app/controllers/admin/application_controller.rb
class Admin::ApplicationController < ApplicationController
    layout "front/layouts/application"
  
    before_action :set_user_class, :set_locale, :init_timezone

    def set_user_class
        @user_class = Staff
    end

    ・・・
end
```

`@user_class`を設定してあげないと、loginメソッドを呼び出したときに`config/initializers/corcery.rb`で設定した`config.user_class = 'User'`を参照します。  
管理画面へのログインの場合でもUserモデルを参照してしまいエラーとなります。  
それぞれ明示的に`@user_class`を設定しておきましょう。  


##### 管理画面のログイン処理
■ ルーティング
```ruby
namespace :users, module: :users do
    resource :sessions, only: [:new, :create], :path_names => { new: 'signin' } do
        delete :signout, to: 'sessions#signout', as: :signout
    end
end
```

■ コントローラー
```ruby
class Admin::Users::SessionsController < Admin::ApplicationController

    skip_before_action :require_login, expect: [:new, :create]

    def new
        @staff = Staff.new
    end

    def create
        @staff = login(login_params[:email], login_params[:password]) { |u, failure_reason|
            @failure_reason = failure_reason
        }
        if @staff
            redirect_back_or_to(root_path, notice: t('admin.signin_successful'))
        else
            @staff = Staff.new
            @staff.errors.add(:base, I18n.t("activerecord.errors.models.staff.base.#{@failure_reason.to_s}"))
            render :new
        end
    end

    def signout
        logout
        redirect_to(new_users_sessions_path, notice: t('admin.signed_out'))
    end

    private
        def login_params
            params.require(:staff).permit(:email, :password)
        end
end
```

viewは特に特別な記載はないので省略します。
という感じでメモです。
