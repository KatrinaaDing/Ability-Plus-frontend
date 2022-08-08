
# Glhf‘s Frontend Deployment Instruction

Please follow the instruction to run the project locally. This instruction is for MacOS system.

## Table of Contents
  * [1. Environment](#1-environment)
  * [2. Install `npx`](#1install-npx)
      - [2.1 Check if `npm` has been installed](#check-npx)
      - [2.2 Check if  `node` has been installed](#check-node)
      - [2.3 Uninstall `node`](#uninstall-node)
      - [2.4 Install/Reinstall `node`](#reinstall-node)
      - [2.5 Check if `node` and `npm` are successfully installed](#check-all)
      - [2.6 Install `npx`](#install-npx)
  * [3. Serve the Frontend](#serving)
      - [3.1 Extract the `.tar.gz` file](#extract)
      - [3.2 Serving the frontend](#serve-frontend)




## 1. Environment

Frontend are served with `npx` **or** `yarn`. Please make sure you have one of them installed.

You can check that with following command:

1. Check if `npx` is installed	

   ```shell
   npx -v
   ```

   Possible output (the version of installed `npx`):

   ```shell
   7.5.2
   ```

2. Check if `yarn` is installed

   ```shell
   yarn -v
   ```

   Possible output (the version of installed `yarn`):

   ```shell
   1.22.19
   ```

If the output doesn't match with the possible output above (e.g.`command not found: npx` or error occurs), please follow [this instruction](#2-install-npx) to install `npx`.

Otherwise, you can [serve the frontend in localhost](#serving).



## <a name='1install-npx'>2. Install `npx`</a>

`npx` is installed with `npm`, so you could start with check if `npm` has been installed.



#### <a name='check-npx'>2.1 Check if `npm` has been installed</a>

In terminal, execute

```shell
npm --version
```

If terminal says `command not found: npm`, please follow the following instruction to install `npm`. Otherwise, you skip the installation and head to [2.6 Install npx](#install-npx).



#### <a name='check-node'>2.2 Check if  `node` has been installed</a>

In terminal, execute

```shell
node --version
```

If terminal **does not** print out the version of `node`, that means `node` has not be installed. You can skip to [2.4 Install/Reinstall node](#reinstall-node) section below.

Otherwise, you have to uninstall `node` before re-installing it.



#### <a name='uninstall-node'>2.3 Uninstall `node`</a>

* If you are using `brew`:

    ```shell
    brew uninstall --ignore-dependencies node
    ```

    You'll see something like

    ```shell
    Uninstalling /usr/local/Cellar/node/17.7.2... (1,999 files, 46.3MB)
    ```



* If you are using `apt`:

 

#### <a name="reinstall-node">2.4 Install/Reinstall `node`</a>

* If you're using `brew`:

    In the terminal, execute

    ```shell
    brew install node
    ```

    You'll see something like

    ```shell
    ==> Downloading https://mirrors.aliyun.com/homebrew/homebrew-bottles/node-17.7.2.monterey.bottle.tar.gz
    ######################################################################## 100.0%
    ==> Pouring node-17.7.2.monterey.bottle.tar.gz
    🍺  /usr/local/Cellar/node/17.7.2: 1,984 files, 45.9MB
    ==> Running `brew cleanup node`...
    Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
    Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
    ```

* If you are using `apt`:





#### <a name='check-all'>2.5 Check if `node` and `npm` are successfully installed</a>

In the terminal, execute

```shell
node --version && npm --version
```

You'll see something like

```shell
v17.7.2
8.5.2
```

Which means `npm` has been successfully installed.



####  <a name='install-npx'>2.6 Install `npx`</a>

Simply execute this command in your terminal:

```shell
npm install -g npx
```

This command uses NPM to install `npx` globally.

Now you can [check environment](#1-environment) agian.



## <a name="serving">3. Serve the Frontend</a>

The frontend is served with `yarn` or `npx`.

**<u>Before running the frontend, please have the backend running at the same time!</u>**

#### 3.1 <a name='extract'>Extract the `.tar.gz` file</a>

In the folder where `glhf-frontend.tar.gz` is located, execute:

```shell
tar -xf glhf-frontend.tar.gz 
```

There'll be a `glhf-frontend` directory in the folder.

#### <a name='serve-frontend'>3.2 Serving the frontend</a>

* If you would like to use `npx`:

  In the folder where `glhf-frontend` directory is located, execute:

  ```shell
  npx serve -s glhf-frontend
  ```

* If you would like to use `yarn`:

  In the folder where `glhf-frontend` directory is located, execute:

  ```shell
  yarn serve -s glhf-frontend
  ```

  If you see errors like:

  ```shell
  yarn run v1.22.17
  error material-kit-2-react@2.0.0: The engine "node" is incompatible with this module. Expected version "14 || 15 || 16". Got "17.7.2"
  error Commands cannot run with an incompatible environment.
  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
  ```

  This is because your installed `node` version is too high. Other than downgrading your `node`, an easier option is to run the frontend with `npx`.

  



The app has been successfully started if you see something like:

```shell
   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:            http://localhost:3000        │
   │   - On Your Network:  http://192.168.137.60:3000   │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘
```

Then you can go to http://localhost:3000 to view the application

Enjoy Ability Plus!









