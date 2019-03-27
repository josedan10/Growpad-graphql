
#Models
---

##<span id="user">User</span>
* **_id** (primary key)
* **username** (index, unique)
* **email** (unique)
* **password** (encrypted)
* **firstName**
* **lastName**
* **birthDate**
* **sex** (*M* | *F*)
* **type** (*standard* | *admin* | *premium*)
* **language** (*es* | *en* | *pt*)
* **ocupation**
* **finance**
  * **salary**
  * **services**
    * **name**
    * **regularity** (*months* | *days* | *years*)
    * **cost**
  * **market**
    * **item**
    * **unit**
    * **qty**
    * **price**
* **notes** (1 : N)     => [ <a href="#note">Note</a> ]
* **lists** (1 : N)     => [ <a href="#list">List</a> ]
* **wallets** (1 : N)   => [ <a href="#wallet">Wallet</a> ]
* **interests** (1 : N) => [ <a href="#interest">Interest</a> ]
* **plans** (1 : N)     => [ <a href="#plan">Plan</a> ]

##<span id="interest">Interest</span>
* **_id** (primary key)
* **name** (index, unique)
* **users** (M : N) => [ <a href="user">User</a> ]

##<span id="tag">Tag</span>
* **_id** (primary key)
* **name** (index, unique)
* **users** (M : N) => [ <a href="user">User</a> ] *users are related to tags by lists, notes, wallets and plans*

##<span id="list">List</span>
* **_id** (primary key)
* **title**
* **items**
  * **name**
  * **checked**
* **tags** (1 : M)        => [ <a href="#tag">Tag</a> ]
* **sharedWith** (M : N)  => [ <a href="#user">User</a> ]
* **createdBy** (1 : 1)   => <a href="#user">User</a>

##<span id="note">Note</span>
* **_id** (primary key)
* **title** (default: *DateTime*)
* **content**
* **tags** (1 : N)        => [ <a href="#tag">Tag</a> ]
* **sharedWith** (M : N)  => [ <a href="#user">User</a> ]
* **createdBy** (1 : 1)   => <a href="#user">User</a>

##<span id="wallet">Wallet</span>
* **_id** (primary key)
* **name**
* **description**
* **balance**
* **tags** (1 : N)  => [ <a href="#tag">Tag</a> ]
* **owner** (1 : 1) => <a href="#user">User</a>

##<span id="movement">Movement</span>
* **_id** (primary key)
* **action** (*deposit* | *withdrawal*)
* **amount**
* **date**
* **wallet** (N : 1)  => <a href="#wallet">Wallet</a>
* **user** (1 : 1)    => <a href="#user">User</a>

##<span id="plan">Plan</span>
* **_id** (primary key)
* **targets**
  * **cost**
  * **priority**
  * **interestPercentage**
* **wallets** (M : N) => <a href="#wallet">[ Wallet ]</a>
