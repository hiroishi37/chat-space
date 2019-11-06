## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, t.references :user, foreign_key: true|
|group_id|integer|null: false, t.references :user, foreign_key: true|
### Association
  belongs_to :group
  belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
  has_many :groups
  has_many :messages
  has_many :groups_users
  
## massageテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, t.references :user, foreign_key: true|
|message|text|null: false|
### Association
  belongs_to :group
  belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
### Association
  has_many :messages
  has_many :users
  has_many :groups_users