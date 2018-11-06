# KPS (KoLiBer Project Standard)

> KPS have four stages of defenitions:

1. Software Development
2. Clean Code and Refactoring
3. Project Structure
4. Git and Versioning
5. Document Files

________________________________________________________________

## Software Development

> KPS is a way to make software development even more clear.
> It defines six stages for software development :

1. Planning
2. Cycling
3. Designing
4. Building
5. Testing
6. Deploying

________________________________________________________________

### Planning (Planning and Requirement Analytics)

At the first level we should do these items :

1. Determine the __purpose__ of the project and doc them into __README.md__
2. Defining __TODO__ List and doc them into __TODO.md__
3. Create __Backlog__ at __Zoho or etc__ if SDLC was Agile using Scrum methodology.

________________________________________________________________

### Cycling (Life Cycling - SDLC)

At the second level we should do these items :

1. Determine the type of __SDLC__ and doc them into __README.md__
2. Create __Sprints, Epics__ at __Zoho or etc__ if SDLC was Agile using Scrum methodology.

________________________________________________________________

### Designing (Architecturing and Designing)

At the third level we should do these items :

1. Determine the __layers and parts__ of software (client -> ui, logic, db, net, ...  --- server -> logic ( -> login, load balancer, ...), ...) using `TODO.md`
2. Determine the __architecture__ of layers (Layered(Domain-Centric (Clean, ...), Database-Centric (MVC, MVP, MVVM, ...)), Client-Server, Master-Slave, Pipeline, Broker, ...)
3. Determine the __design__ of layers and determining __classes__
4. Create __UML__ of classes and scenarios
5. Create __API__ of software (library) methods or REST calls or etc and doc them into __API.md__
6. Create __DBMS__ tables and fields and doc them into __DBMS.md__
7. Create __Wireframe, Prototype__ of __UI__

________________________________________________________________

### Building (Coding using `Clean Code`)

At the fourth level we should do these items :

1. __Coding and Developing__ the project layers (ui, core, db, net, ...) using __Clean Code__ rules

________________________________________________________________

### Testing (Unit Testing)

At the fifth level we should do these items :

1. Creating __Tests__ for the project and test them

________________________________________________________________

### Deploying

At the sixth level we should do these items :

1. Creating __release__ build of the project and __launch__ them
2. __UAT__ and analysing user comments

________________________________________________________________

## Clean Code and Refactoring

> Some basic and important tips for clean coding

### File and Folder

1. File names must be __simple__, __readable__, __consistent__
2. __SQL__ commands with Capital characters
3. Consistant __Indention__ (space and {} and ...)
4. After finishing every file __refactor__ it (check comment, method size, variable naming, SQL, ...)
5. __DRY__ principle (Don't Repeat Yourself)

### Naming (File, Folder, Class, Method, Variable, Temp, ID, ...)

1. Names must be __simple__
2. Names must be __readable__
3. Names must be __one word per meat__
4. Names __should'nt be abbrevation__ (ksto -> koliber standard orm)
5. Name -> File, Class, Variable, Temp, ID
6. Verb -> Method
7. Fixed naming style (__CamelCase -> AddNumber__, __UnderScore -> add_number__)
8. Variable Naming:
    * Naming by __goal__ and __simple__
9. Temps Naming:
    1. __i, j, k, t__ -> loops
    2. __cursor__ -> important loops
    3. __result__ -> method return value
    4. __item__ -> foreach or iterator
10. ID Naming:
    * __{base component}\_{view type}[\_{description 1}\_{description 2}\_{description 3}]__

### Classes

1. No GOD class (simple and small)
2. Every class has one goal
3. Every class is a black box (private every unnecessary methods and getter/setter for variables)
4. Every class is a module (no dependency - inteact with other classes using interfaces)
5. No Dead code -> if don't need now the code remove it !
6. For using DBMS, Net, etc create wrapper class (implement logic - them implement low level code (net, file, ...) using other class)

### Methods

1. Methods should be small
2. Methods should have one goal (do only one work)
3. Methods should be blackbox (get params, return result - without side effect !) (side effects using getter, setters (var, file, memory, net, db, ...))
4. Not nested control structures (if{if{...}} -> if{} if{} if{})
5. If control conditions gets bigger (if(a & !c | d & f)) use a method for that (if(cond()){...})
6. Methods should'nt return error codes, throw errors is better !
7. Grouping codes in every method and comment every group
8. DRY principle (don't copy methods - move them into super class)

### Commenting

1. Don't comment bad code, rewrite it !
2. Don't comment big if conditions, move it to new method !
3. Comment descriptions
4. Comment tips
5. Comment alerts
6. Comment XDoc
7. Comment method code groups
8. Other comments are noises !
9. XDoc:
    * File Description
    * Class Description
    * Constructor Description
    * Methods Description
10. XDoc Descriptions:
    ```text
    /**
    * your comments
    * your comments
    * your comments
    * @ xdoc command
    * @ xdoc command
    * @ xdoc command
    */
    ```  

### Coding

1. Create File
2. Create Class
3. Create abstract Methods
4. XDoc File
5. Implement Methods
6. Refactor File
7. Goto Next File

### Modularity

> The most important thing in conding stage is relying on __modularity__, so break every project into submodules like __app__ (starting main), __ui__, __core__, __db__, __net__, ...
>> So at the `Designing` stage of out software development we should design our architecture and __break into layers__ (modules - ui, core, net, db, ...)

* Every module has it's own dependencies (`lib`)
* Every module has it's own target (UI, Core, DB, User Management, Analyze, Network, ....)
* Every project has some modules and an `app` module that is the start point of project and create other modules and connects them together
* Modularity using `modules` path and __multi subprojects__ per project (configing CMake or Gradle or Rebar or NPM or etc)

________________________________________________________________

## Project Structure

> Project directory structure is fully standardized based on source language (Node.js, Erlang, C, Java, ...) and project type (server, web, library, ...) .
> So project directory structure is divided into two or more branches, A parent node contains `git configs` and `documents`, and the `sources` directory that contains branches based on project branch source type (server, web, library, ...).

### project

> Base Project Directory Structure : `.git`, `docs`, `sources (branched)`, `.gitignore`, `.gitmodules`, `.gitattributes`, `README.md`

1. __{project_name}/__
    1. __.git/__
        1. ...
    2. __docs/__
        1. ...
    3. __sources/__
        1. {type}\_[{description}]__
            1. ...
        2. ...
    4. __.gitignore__
    5. __.gitmodules__
    6. __.gitattributes__
    7. __README.md__

* __types__:

    | Name        | Description                                                                      |
    | ----------- | -------------------------------------------------------------------------------- |
    | __c__       | Server or Library in C language (CMake)                                          |
    | __qt__      | Cross Platform application in Qt and QML and JavaScript (CMake)                  |
    | __java__    | Java application java and c (gradle)                                             |
    | __node__    | Server application in Node.JS and Express.JS (npm)                               |
    | __react__   | Web application in React and Webpack and Babel and Redux and Flux (webpack, npm) |
    | __erlang__  | Server application in Erlang and Misultin or Cowboy (rebar)                      |
    | __android__ | Android native application java and c (gradle)                                   |

### docs

> Docs Project Directory Structure : `mkdocs.yml`, `README.md`, `LICENSE.md`, `TODO.md`, `DESIGN/ARCHITECTURE.md`, `DESIGN/API.md`, `DESIGN/DBMS.md`, `DESIGN/UML/xxx.pu`, `DESIGN/UI/xxx.xd`

1. __{project_name}/__
    1. __.git/__
        1. ...
    2. __docs/__
        1. __docs/__
            1. __README.md__
            2. __LICENSE.md__
            3. __TODO.md__
            4. __DESIGN/__
                1. __ARCHITECTURE.md__
                2. __API.md__
                3. __DBMS.md__
                4. __UML/__
                    1. __.pu__ (PlantUML) files
                5. __UI/__
                    1. __.xd__ (Adobe XD) files
        2. __mkdocs.yml__
    3. __sources/__
        1. ...
    4. ...

* __types__:

    | Name                       | Description                                                                  |
    | -------------------------- | ---------------------------------------------------------------------------- |
    | __README.md__              | Project goal, solve, license, requirements, languages, developers, date, ... |
    | __LICENSE.md__             | Project license                                                              |
    | __TODO.md__                | Project todo list                                                            |
    | __DESIGN/ARCHITECTURE.md__ | Project architecture, layers, design, link to uml, ui                        |
    | __DESIGN/API.md__          | Project library, socket, http, rest, ... API                                 |
    | __DESIGN/DBMS.md__         | Project dbms tables, fields, datas, configs, ...                             |

### `c`

> C Library or Low level Server Projects Directory Structure : `build`, `include`, `lib`, `public`, `src`, `test`, `CMakeLists.txt`, `DockerFile`, `app.log`, `package.cmake`

1. __c/__
    1. __build/__
        1. ...
    2. __include/__
        1. ...
    3. __lib/__
        1. ...
    4. __public/__
        1. ...
    5. __src/__
        1. ...
    6. __test/__
        1. ...
    7. __CMakeLists.txt__
    8. __DockerFile__
    9. __app.log__
    10. __package.cmake__

### `qt`

> Qt and QML and JavaScript Projects Directory Structure : `build`, `include`, `lib`, `public`, `src`, `test`, `{project}.pro`

1. __qt/__
    1. __build/__
        1. ...
    2. __include/__
        1. ...
    3. __lib/__
        1. ...
    4. __public/__
        1. ...
    5. __src/__
        1. ...
    6. __test/__
        1. ...
    7. __{project}.pro__

### `java`

> Java and JavaFX Projects Directory Structure : `lib`, `public`, `src`, `test`, `build.gradle`, `gradle.properties`, `settings.gradle`

1. __java/__
    1. __lib/__
        1. ...
    2. __public/__
        1. ...
    3. __src/__
        1. ...
    4. __test/__
        1. ...
    5. __build.gradle__
    6. __gradle.properties__
    7. __settings.gradle__

### `node`

> Node.JS and Express.JS Projects Directory Structure : `public`, `src`, `test`, `.npmrc`, `DockerFile`, `app.log`, `package.json`

1. __node/__
    1. __public/__
        1. ...
    2. __src/__
        1. ...
    3. __test/__
        1. ...
    4. __.npmrc__
    5. __DockerFile__
    6. __app.log__
    7. __package.json__

### `react`

> React and Redux or Flux Projects Directory Structure : `build`, `public`, `src`, `test`, `.babelrc`, `.npmrc`, `DockerFile`, `app.log`, `package.json`, `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`

1. __react/__
    1. __build/__
        * ...
    2. __public/__
        * ...
    3. __src/__
        * ...
    4. __test/__
        * ...
    5. __.babelrc__
    6. __.npmrc__
    7. __DockerFile__
    8. __app.log__
    9. __package.json__
    10. __webpack.common.js__
    11. __webpack.dev.js__
    12. __webpack.prod.js__

### `erlang`

> Erlang and Misultin or Cowboy Projects Directory Structure : `deps`, `ebin`, `src`, `include`, `test`, `public`, `rebar.config`

1. __erlang/__
    1. __deps/__
        1. ...
    2. __ebin/__
        1. ...
    3. __public/__
        1. ...
    4. __test/__
        1. ...
    5. __include/__
        1. ...
    6. __src/__
        1. ...
    7. __rebar.config__

### `android`

> Android Projects Directory Structure : `lib`, `public`, `src`, `test`, `build.gradle`, `gradle.properties`, `local.properties`, `settings.gradle`

1. __android/__
    1. __lib/__
        1. ...
    2. __public/__
        1. ...
    3. __src/__
        1. ...
    4. __test/__
        1. ...
    5. __build.gradle__
    6. __gradle.properties__
    7. __local.properties__
    8. __settings.gradle__

### `src`, `include` Directory Structure

> `src` and `include` Directory Structure : `low`, `io`, `dbms`, `view`, `app.{format}`

1. __[src,include]/__
    1. __low/__
        1. dsa/
        2. process/
        3. ...
    2. __io/__
        1. net/
            1. http/
            2. https/
            3. tcp/
            4. udp/
            5. ws/
            6. router/
            7. ...
        2. file/
            1. ...
        3. memory/
            1. ...
    3. __dbms/__
        1. ...
    4. __view/__
        1. dialog_test.js
        2. dialog_alert.js
        3. dialog_bson.js
        4. page_home.js
        5. page_map.js
        6. ...
    5. __app.{format}__

#### View Naming

> For naming files :

1. __Non View Files__: __{description}.{formant}__
2. __View Files__: __{base component}[\_{description 1}\_{description 2}\_{description 3}].{formant}__

________________________________________________________________

## Git and Versioning

> For configuring git we have three level

### config

```bash
git init

git config user.name "{your name}"
git config user.email "{your email}"
git config core.editor code
git config core.autocrlf input
git config http.proxy http://127.0.0.1:8118
git config credential.helper {cache|store} [{timout seconds}]
[git config --unset http.proxy]
[git config --unset credential.helper]

git clone https://gitlab.com/ckoliber/KPS -b base
git clone https://gitlab.com/ckoliber/KPS -b {X}

// change dir struct

git remote add {remote name} [{.git url}]
git push --set-upstream {remote name} master --all
```

### .gitattributes

```text
* text=auto

*.c text
*.h text
*.java text
*.js text
*.jsx text
*.md text

*.o binary
*.class binary
*.png binary
*.jpg binary
*.mov binary
```

### .gitignore

```text
.idea
.vscode
sources/*/node_modules/
sources/*/build/
```

### .gitmodules

```text
[submodule "base"]
	path = ./
	url = https://gitlab.com/ckoliber/KPS.git
	branch = base

[submodule "c"]
	path = ./sources
	url = https://gitlab.com/ckoliber/KPS.git
	branch = c
```

### mkdocs

> For configuring mkdocs we have three level

* __installing__

    ```bash
    sudo apt install python-pip
    sudo pip install mkdocs mkdocs-material
    cd {project name}
    mkdocs new docs
    ```

### Git usage

> This level contains git using level in this level that is a loop until end of project we will use git in our project for version controlling

#### Stage, Commit (To local repository)

> At every quick editing or coding of our project we should save our changes or commit theme
>> For example every 10 min we should commit at least one stage to our local repository

#### Push (To remote repository)

> At every day editing after coding before release theme we should save our codes in a stable repository such as `gitlab.com` remote repository
>> For example every day we should push at least one commit to our remote repository

#### Pull (From remote repository)

> When ever we coding on two different system or need to rebase our codes from remote repository or etc, we should `pull` and `stage` and `commit` from and to remote and local repositories

#### Branching

> Managing branches is an important part of group working, creating standard branches and merging theme based on these rules

##### Branches names

###### master (master branch)

> In `master` branch we `tagging` the code
>> Bacause of global bug fixing we dont create a different branch such as `hotfix` for our bug fixing releases, so all of the releases are going into `master` branch with full clear tag

###### develop

> In `develop` branch we put our before release codes for final testing and analyzing and profiling if result was successful we merge `develop` branch into `master` and then tag it

###### develop\_{developer name}

> Every developer has it's own fork of code and can `rebase` it from master, after completing code `test`, `analyze` by self then will merge it into `develop` and from `develop` after final testing merge it into `master` and tag it, then if other developers needed the new release they can `rebase` them codes from `master`

#### Tagging

> Managing tags is an important part of releasing project, at the `release` branch we will tag our code versions based on these rules

##### X.Y.Z - Major.Minor.Patch

###### X (Major)

> Shows the big release number

###### Y (Minor)

> Shows the `futures` that added to this `X` version

###### Z (Patch)

> Shows the `bugs` that fixed from this `X` version

###### Example

* __0.1.0__ (start version)
* __1.2.1__
* __2.2.0__
* __0.5.34__

________________________________________________________________

## Document Files

### README.md

1. Project Name
2. Project Description
3. Project Owner
4. Project Author
5. Project Developers
6. Project Start date
7. Project Question
8. Project Goal
9. Project License
10. Project Languages and Frameworks
11. Project SDLC
12. Project links (zoho, gitlab, npm, etc)

### TODO.md

1. Todo Items
2. Todo Item Deadline
3. Todo Item Version

> At the `TODO.md` we will writing project futures and tagging them and deadlines
>> For writing todo's we can use these rules

1. __Contents__
    * __Example__
        1. __user__ -> login, logout, state
        2. __map__ -> search, set, get, analyze
        3. __search__ -> site search
        4. __aboutus__ -> about us
        5. __contactus__ -> contact us
        6. __content__ -> site content and posts
2. __Parts__
    * __Example__
        1. __indexpage__
            1. signin dialog
            2. signout dialog
            3. signup dialog
            4. aboutus dialog
            5. contactus dialog
            6. toolbar
            7. carousel
            8. futures
            9. description
            10. footer
            11. fab
        2. __mappage__
            1. signin dialog
            2. signout dialog
            3. signup dialog
            4. aboutus dialog
            5. contactus dialog
            6. toolbar
            7. map
            8. fab
        3. __adminpage__
            * ...
        4. __contentpage__
            * ...
        5. __detailpage__
            * ...
3. __Tagging__
    > We should tag our futures __until the next big release__
    * __Example__
        1. __indexpage__  -> 0.1.Z
            1. signin dialog -> 0.1.Z
            2. signout dialog -> 0.1.Z
            3. signup dialog -> 0.1.Z
            4. aboutus dialog -> 0.1.Z
            5. contactus dialog -> 0.1.Z
            6. toolbar -> 0.1.Z
            7. carousel -> 0.1.Z
            8. futures -> 0.1.Z
            9. description -> 0.1.Z
            10. footer -> 0.1.Z
            11. fab -> 0.1.Z
        2. __mappage__ -> 0.1.Z
            1. signin dialog -> 0.1.Z
            2. signout dialog -> 0.1.Z
            3. signup dialog -> 0.1.Z
            4. aboutus dialog -> 0.1.Z
            5. contactus dialog -> 0.1.Z
            6. toolbar -> 0.1.Z
            7. map -> 0.1.Z
            8. fab -> 0.1.Z
        3. __adminpage__ -> 0.3.Z
            * ...
        4. __contentpage__ -> 0.4.Z
            * ...
        5. __detailpage__ -> 0.4.Z
            * ...
4. __Styling Views__
    > In this level we should design our `mockup` and create out `prototype` using `Adobe XD`.

### DESIGN/ARCHITECTURE.md

1. Project architecture (client-server, master-slave, layered, ...)
2. Project layers (client -> ui, core, net, ...)(MVC, MVP, MVVP, Clean, ...)
3. Project uml links

### DESIGN/API.md

1. Library methods api
2. REST api
3. Socket api
4. ...

### DESIGN/DBMS.md

1. DBMS tables
2. DBMS fields
3. DBMS configs
4. DBMS params
5. ...

### DESIGN/UML

* Project uml's based on user stories

### DESIGN/UI

* Adobe XD UI wireframes and prototypes

________________________________________________________________

## __Review__

> Now we review the steps of our Software Development Path:

1. __Init__
    1. Initialize __Git__ and __GitLab__ and __Zoho Sprints__
    2. Clone __KPS__ `docs`, `sources`
2. __Planning__
    1. Complete __README.md__
    2. Create __TODO list__ and __Version__ and __Deadline__ in __TODO.md__
    3. __Group__ todo list items into sub groups (__releases__)
    4. __Version__ todo list items based on groups and group items (__order them__)
    5. If SDLC was Agile using Scrum methodology create __Backlog__ in __Zoho Sprints__ or etc
3. __Cycling__
    1. Determine type of SDLC (Waterfall, Iterative, Sprial, Bigbang, V-Model, Agile, ...) and save into __README.md__
    2. If SDLC was Agile using Scrum methodology create __Release Backlogs__, __Sprints__, __Epics__ in __Zoho Sprints__ or etc
4. __Designing__
    1. Design __Use Case Diagram__ and save into __DESIGN/UML/__
    2. Determine __Modules__ of Project from Use Case Diagram (ui, file, net, peer, pipe, broker, proxy, ...) and save into __DESIGN/ARCHITECTURE.md__
    3. Design __Class Diagram__ from __Modules__ and __Methods of Use Case Diagram__ and save into __DESIGN/UML/__
    4. Break project into layers (client -> ui, core, net, db, file, ... --- server -> core, db, net, file, ...)(modules - requirements)
    5. Design application interface __REST or Socket or Library methods or etc__ and save into __DESIGN/API.md__
    6. Design all of db's __Tables and Fields and Configs and etc__ and save into __DESIGN/DBMS.md__
    7. Design ui __Wireframe and Prototype__ and save into __DESIGN/UI/__
5. __Building__
    1. Start modules of project based on todo release items
    2. Focus on Clean Code (File, Naming, Class, Method, Comment) principles
6. __Testing__
    1. Create __Unit Tests__ for project and modules
7. __Deploying__
    1. Create __Release Build__ of project
    2. Launch project
    3. UAT feedback and save into __Zoho Sprints__

### Summary

1. __Init__: Git
2. __Plan__: README.md -> TODO.md | README.md -> Agile using Scrum(backlog)
3. __Cycle__: README.md -> Agile using Scrum(release backlogs, sprints, epics)
4. __Design__: DESIGN/API.md -> DESIGN/DBMS.md -> DESIGN/UML/... -> DESIGN/UI/...
5. __Build__: Clean Code
6. __Test__: Unit Testing
7. __Deploy__: Comments in Zoho (UAT)