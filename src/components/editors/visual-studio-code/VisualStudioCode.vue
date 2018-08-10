<template>
    <div class="container">
        <div class="panel-group">
    <div class='panel panel-primary'>
        <div class='panel-heading'>
            <h2>Visual Studio Code</h2>
        </div>
        <div class="panel-body">
                    <h2>Useful Links</h2>
                    <h3>Visual Studio Code</h3>
                    <a href="https://code.visualstudio.com/Docs/customization">https://code.visualstudio.com/Docs/customization</a><br
                />
                    <a href="http://www.johnpapa.net/visual-studio-code">http://www.johnpapa.net/visual-studio-code</a>
                    <h3>Gulp</h3>
                    <img src="./images/gulp.png" />
                    <p>Gulp is an Automated Task Runner. It can be used for various build time tasks such as:</p>
                    <ul>
                        <li>compressing new or modified images</li>
                        <li>removing console and debugger statements from scripts</li>
                        <li>concatenating and minifying CSS and JavaScript files</li>
                        <li>deploying updates to a production server</li>
                    </ul>
                    <p>The official gulp site can be accessed from: <a href="http://gulpjs.com/">http://gulpjs.com/</a></p>
                    <p>John Pappa has created a course that covers JavaScript Build Automation With Gulp.js on Pluralsight that
                        can be found here: <a href="http://www.pluralsight.com/courses/javascript-build-automation-gulpjs">http://www.pluralsight.com/courses/javascript-build-automation-gulpjs</a>
                    <p>Another guide to gulp can be found here: <a href="http://www.sitepoint.com/introduction-gulp-js/">http://www.sitepoint.com/introduction-gulp-js/</a></p>
                    <h3>Node Package Manager</h3>
                    <img src="./images/npm.png" />
                    <p>Node Package Manager is a JavaScript package installer that is used to install server side JavaScript
                        libraries such as:</p>
                    <ul>
                        <li>gulp</li>
                        <li>bower</li>
                        <li>typescript</li>
                        <li>generator-aspnet</li>
                    </ul>
                    <p>The official npm site can be access from: <a href="https://www.npmjs.com/">https://www.npmjs.com/</a></p>
                    <h3>Bower</h3>
                    <img src="./images/bower.png" />
                    <p>The official <a href="bower.io">Bower site</a> says:</p>
                    <i><strong>"Web sites are made of lots of things — frameworks, libraries, assets, utilities,
                        and rainbows. Bower manages all these things for you."</strong></i>
                    <p>Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading,
                        and saving the stuff you’re looking for. Bower keeps track of these packages in a manifest file,
                        bower.json. How you use packages is up to you. Bower provides hooks to facilitate using packages
                        in your tools and workflows.</p>
                    <h3>Yeoman</h3>
                    <img src="./images/yeoman.png" />
                    <p>Yeoman helps you to kickstart new projects, prescribing best practices and tools to help you stay productive.</p>
                    <p>To do so, Yeoman provides a generator ecosystem. A generator is basically a plugin that can be run with
                        the `yo` command to scaffold complete projects or useful parts.</p>
                    <p>The official Yeoman site can be accessed from here: <a href="http://yeoman.io/">http://yeoman.io/</a></p>
                    <h3>TypeScript</h3>
                    <img src="./images/typescript.png" />
                    <p>TypeScript is a free and open source programming language developed and maintained by Microsoft. It is
                        a strict superset of JavaScript, and adds optional static typing and class-based object-oriented
                        programming to the language. Anders Hejlsberg, lead architect of C# and creator of Delphi and Turbo
                        Pascal, has worked on the development of TypeScript. TypeScript may be used to develop JavaScript
                        applications for client-side or server-side execution.
                    </p>
                    <a href="http://www.typescriptlang.org/">http://www.typescriptlang.org/</a>
                    <h3>Emmet</h3>
                    <img src="./images/emmet.png" />
                    <p>Emmet is a plugin for many popular text editors which greatly improves HTML & CSS workflow. It provides,
                        amongst other features, shortcut syntax for creating HTML.</p>
                    <a href="http://emmet.io/">http://emmet.io/</a>
                    <h3>Markdown</h3>
                    <p>Format md files etc.</p>
                    <h3>Less</h3>
                    <p>CSS variables etc.</p>
                    <h2>Starting Visual Studio Code</h2>
                    <h3>Windows</h3>
                    <p>You can start a new instance of Code from a Windows Command Line by entering:</p>
                    <code>code .</code>
                    <p>Code will start in the directory where you issued the command.</p>
                    <p>You can specify a directory or file to open by adding a path like so:</p>
                    <code>code vscode/index.html</code>
                    <p>You can reuse an existing instance of code by adding the <code>-r</code> flag as follows:</p>
                    <code>code vscode/index.html -r</code>
                    <h3>Mac</h3>
                    <p>To setup Visual Studio Code on a Mac visit the following link for instructions on configuring your bash
                        profile</p>
                    <a href="https://code.visualstudio.com/Docs/setup">https://code.visualstudio.com/Docs/setup</a>
                    <h2>Basic Editing</h2>
                    <p>The following table describes some of the basic editing commands available in Visual Studio Code.
                    </p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Command/Keystroke</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ctrl+Shift+P</td>
                            <td>Display the Command Palette</td>
                        </tr>
                        <tr>
                            <td>Ctrl+P</td>
                            <td>Display the file navigation palette</td>
                        </tr>
                        <tr>
                            <td>Ctrl+P then ?</td>
                            <td>Display all the available commands for running</td>
                        </tr>
                        <tr>
                            <td>Ctrl+P then @</td>
                            <td>Goto Symbol (functions, strings etc.)</td>
                        </tr>
                        <tr>
                            <td>Ctrl+Shift+O</td>
                            <td>Goto Symbol (functions, strings etc.)</td>
                        </tr>
                        <tr>
                            <td>Ctrl+P then @:</td>
                            <td>Goto Symbol by category (arrays, booleans, properties strings functions etc.)</td>
                        </tr>

                        <tr>
                            <td>Ctrl+Shift+M</td>
                            <td>Display errors and warnings</td>
                        </tr>
                        <tr>
                            <td>Ctrl+\</td>
                            <td>Display the Split Editor. Opens up another editor window within Code.</td>
                        </tr>
                        <tr>
                            <td>Ctrl+1 through 3</td>
                            <td>Moves focus between the windows in the editor (max 3)</td>
                        </tr>
                        <tr>
                            <td>Ctrl+0</td>
                            <td>Moves focus to the Sidebar</td>
                        </tr>
                        <tr>
                            <td>Ctrl+W</td>
                            <td>Close the active window</td>
                        </tr>
                        <tr>
                            <td>F11</td>
                            <td>Toggle fullscreen</td>
                        </tr>
                        <tr>
                            <td>
                                Ctrl+B
                            </td>
                            <td>
                                Toggle the sidebar
                            </td>
                        </tr>
                        <tr>
                            <td>Alt+Left Arrow</td>
                            <td>Navigate backwards through working files</td>
                        </tr>
                        <tr>
                            <td>Alt+Right Arrow</td>
                            <td>Navigate forwards through working files</td>
                        </tr>
                        <tr>
                            <td>Ctrl+Tab</td>
                            <td>Navigate History</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2>The Viewbar</h2>
                    <p>By default the Viewbar is located on the left hand side of the Visual Studio Code Window:
                    </p>
                    <img src="./images/viewbar.png" />
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img src="./images/explorer.png" /></td>
                            <td>Displays the file explorer sidebar.</td>
                        </tr>
                        <tr>
                            <td><img src="./images/search.png" /></td>
                            <td>Displays the search sidebar</td>
                        </tr>
                        <tr>
                            <td><img src="./images/git.png" /></td>
                            <td>Displays the Git integration sidebar</td>
                        </tr>
                        <tr>
                            <td><img src="./images/debugger.png" /></td>
                            <td>Displays the Debugger sidebar</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2>Status Bar</h2>
                    <p>The blue bar at the bottom of the VS Code window is the Status Bar.</p>
                    <img src="./images/statusbar.png" />
                    <p>The Status Bar displays information such as:</p>
                    <ul>
                        <li>The git branch you are currently viewing.</li>
                        <li>The number of errors and warnings in the current project.</li>
                        <li>The line and column number position of the cursor in the current file.</li>
                        <li>The file encoding format</li>
                        <li>The language that the current file is written in (if recognised).</li>
                        <li>A feedback icon</li>
                    </ul>
                    <h2>The Command Palette</h2>
                    <p>The command palette allows you to perform commands including opening up files, running tasks, executing
                        git commands, navigating code etc. </p>
                    <h2>The Search Sidebar</h2>
                    <p>The search icon allows you to type in a search term. The results will show any file where the search
                        term is present. There are a number of advanced options such as regular expressions and matching
                        case.</p>
                    <h2>Previewing Files</h2>
                    <p>Some file types (e.g. markdown) will give you an option to preview within Code. When this option is available
                        you will see the preview icon in the top right hand corner of the window:</p>
                    <img src="./images/preview.png" />
                    <p>Clicking this icon will change the view to preview mode. At this point the View Source icon will become
                        visible:</p>
                    <img src="./images/sourceview.png" />
                    <p>Clicking this icon will take you back to the source code.</p>
                    <h2>Navigating and editing files</h2>
                    <p>Press Ctrl+P twice to take you back to the previous file.</p>
                    <p>Within a file if you see a link to another file you can often hover over the file and then hold down
                        Ctrl + click to open that file in another editor window.</p>
                    <h2>Supported Languages</h2>
                    <p>Code supports a number of languages and provides features such as Syntax coloring, bracket matching,
                        intellisense, linting and outline. In addition Code provides Refactoring features for C# and TypeScript.</p>
                    <p>Visit <a href="https://code.visualstudio.com/Docs/languages">https://code.visualstudio.com/Docs/languages</a>                        for a full list of the languages that Code supports.</p>
                    <h2>Refactoring</h2>
                    <p>Visual Studio Code really shines when it comes to refactoring code. It provides functionality to perform
                        the following:</p>
                    <ul>
                        <li>Code Refactorings</li>
                        <li>Bracket Matching</li>
                        <li>HTML editing with Emmet</li>
                        <li>Selecting and Cursors</li>
                        <li>Powerfull Multi Cursors</li>
                        <li>JSON and CSS Intellisense</li>
                        <li>JavaScript Intellisense</li>
                        <li>JavaScript Intellisense with Typings</li>
                        <li>User Snippets</li>
                        <li>Sharing Snippets</li>
                        <li>Go to Definition, Find References, and Peek</li>
                        <li>References in TypeScript</li>
                        <li>Finding and Renaming Symbols</li>
                        <li>Errors and Formattin</li>
                        <li>Quick Line Movement and Editing</li>
                        <li>Refactoring Recap</li>
                    </ul>
                    <p>There is a detailed explanation of all these features in the John Pappa Pluralsight course: <a href="www.pluralsight.com/courses/visual-studio-code">Visual Studio Code</a>                        under section 4 - Refactoring</p>
                    <p>I will document these features at some point but in the meantime refer to the Pluralsight Course for
                        further information</p>
                    <h3>Selecting Code</h3>
                    <p>The following table describes some basic selection commands and keystrokes:</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tr>
                            <td>Select some text then Ctrl + F2</td>
                            <td>Highlights and places a multicursor at the end of every instance of the selected text in the
                                current file.</td>
                        </tr>
                        <tr>
                            <td>Alt + Click</td>
                            <td>Drops multicursors at the point where you click</td>
                        </tr>
                        <tr>
                            <td>Ctrl + Alt + Down Arrow or Up Arrow</td>
                            <td>Draw cursors from the current position downward</td>
                        </tr>
                        <tr>
                            <td>Select some text then Ctrl + D</td>
                            <td>Progressive multicursor selection. Ctrl + D will select subsequent instances of the selected
                                text. Whilst Ctrl is still held press K to skip or jump over an instance.</td>
                        </tr>
                        <tr>
                            <td>Move a line or block of code up or down</td>
                            <td>Select some text then Alt + Down Arrow or Up Arrow</td>
                        </tr>
                        <tr>
                            <td>Duplicate a line or block of code up or down</td>
                            <td>Select some text then Shift + Alt + Down Arrow or Up Arrow</td>
                        </tr>
                        <tr>
                            <td>Format Code</td>
                            <td>Shit + Alt + F</td>
                        </tr>
                    </table>
                    <h2>Adding Typing files</h2>
                    <p>Visual Studio Code allows you to add typing files so that it can offer Intellisense on third party librares
                        (e.g. angular, jquery) You can add these files by issuing the following command in a powershell window
                        (make sure you are in the desired directory):</p>
                    <code>tsd query -r -o -a install angular -s</code>
                    <p>Because angular is reliant on jquery the jquery.d.ts file will also be installed. The parameters have
                        the following meanings:</p>
                    <ul>
                        <li>-a denotes this is an action</li>
                        <li>-s saves to a file so that code remembers these commands</li>
                        <li>-o overwrites the file if it already exists</li>
                        <li>-r specifies a recursive search to pull back any references that the file might rely on (e.g. angular
                            relies on jquery)</li>
                    </ul>
                    <p>The command will create a tsd.json file to track what has been added. As well as a tsd.d.ts file that
                        lists the references in the project. It will also have added angular and jquery reference files.</p>
                    <h2>Built in and User Snippets</h2>
                    <p>In addition to the built-in snippets that you can generate by starting to type some code then hitting
                        tab (e.g. typing fun then using down arrow to select function Statement then pressing Tab will create
                        a JavaScript function with placeholders for you to add the function name, the parameters and the
                        body of the function) you can add User Snippets. All the User Snippets are stored on the local machine
                        under a filename that corresponds to the Language they written in (e.g. javascript.json).</p>
                    <p>John Pappa has written some angular specific snippets for JavaScript and TypeScript that are located
                        here:
                        <a href="http://jpapa.me/ngstyles">http://jpapa.me/ngstyles</a></p>
                    <p>In order to create a User snippet you have to provide:</p>
                    <ul>
                        <li>Description - a description of the snippet</li>
                        <li>Prefix - the text that the user must type to trigger the snippet</li>
                        <li>Body - an array representing each line of the Snippet.</li>
                    </ul>
                    <p><strong>Tip</strong> You may need to issue the Reload Window command from the Command Palette if you
                        can't access the Snippet you have just created.</p>
                    <p>The various .json files that store this data are located in a location similar to:
                        <strong>C:\Users\Max\Appdata\Roaming\Code\User\Snippets</strong></p>
                    <h2>Go to Definition, Find References, and Peek</h2>
                    <p>With a symbol highlighted press F12 to go to definition or Alt + F12 to peek at the definition.
                    </p>
                    <p>To find all references in the file press Shift + F12. This will display a peek window with all the occurrences
                        of the symbol listed. Clicking on an occurrence will move the peek to that position in the code.
                        The peek window is interactive so you can type code into it that will persist in the file.</p>
                    <h3>References in TypeScript</h3>
                    <p>The functionality in TypeScript is more comprehensive than the functionality in other languages.
                    </p>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>Finding and Renaming Symbols</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>Errors and Formatting</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>Quick Line Movement and Editing</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h1>Themes, Preferences and Keyboard Shortcuts</h1>
                    <h2>Themes</h2>
                    <p>Currently there is light, dark and high contrast themes.</p>
                    <h2>Default, User and Workspace Preferences</h2>
                    <p>There are three types of preference settings:</p>
                    <ul>
                        <li>Default - these are readonly and cannot be changed.</li>
                        <li>User - these relate to all instances of Code on the machine.</li>
                        <li>Workspace - these relate to the current project only and are stored in a settings.json file in the
                            project.</li>
                    </ul>
                    <p>You can access User Preferences from the Command Palette by entering "Open User Settings". The Default
                        Settings are read only but the User Settings in the settings.json file are editable. As an example
                        the code below shows a settings.json file where two lines that specify how the editor deals with
                        whitespace have been added.</p>
                    <pre>
                        <code>
        // Place your settings in this file to overwrite default and user settings.<br />
        {<br />
            "editor.renderWhitespace": true,<br />
            "files.trimTrailingWhitespace": true<br />
        }</code>
                    </pre>
                    <p>Another useful example is the option to hide JavaScript files when a related TypeScript file exists:</p>
                    <pre>
                        <code>
            "files.exclude": {
                "**/*.js": { "when": "$(basename).ts"} // hides js files when ts exists
            }
        </code>
                    </pre>
                    <p>I couldn't however get this option to work when I tried it.</p>
                    <h3>Navigating the Default and User Settings Files</h3>
                    <p>The easiest way to do this is to bring up the command palette with an @ sign to search for symbols then
                        start typing the setting that you are interested in (e.g. css, javascript, typescript etc). Because
                        the options are ordered by the type of preference they are you can then use the arrow keys to scroll
                        through the relevant preferences.
                    </p>
                    <h2>Key Bindings</h2>
                    <p>In addition to the default keybindings you can specify your own.</p>
                    <p>The following table describes some useful default keyboard shortcuts</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Shit + Alt + F</td>
                            <td>Format Code</td>
                        </tr>
                        <tr>
                            <td>Alt + F12</td>
                            <td>Peek</td>
                        </tr>
                        <tr>
                            <td>Shift + F12</td>
                            <td>Show All References</td>
                        </tr>
                        <tr>
                            <td>F12</td>
                            <td>Go to Definition</td>
                        </tr>
                        <tr>
                            <td>Ctrl + P</td>
                            <td>Go to File</td>
                        </tr>
                        <tr>
                            <td>Ctrl + 1 trhough 3</td>
                            <td>Focus 1st Panel (or 2nd or 3rd)</td>
                        </tr>
                        <tr>
                            <td>F11</td>
                            <td>Toggle Full Screen</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>A comprehensive list of the default key bindings can be found here:
                        <a href="https://code.visualstudio.com/Docs/editor/keybindings">https://code.visualstudio.com/Docs/editor/keybindings</a></p>
                    <h2>Defining Keybindings</h2>
                    <p>In addition to the default key bindings you can define your own keybindings. These are stored in a file
                        called keybindings.json located in C:\Users\{username}\AppData\Roaming\Code\User
                    </p>
                    <p>You can add entries into the JSon file in the following format:</p>
                    <ul>
                        <li>Key - the pressed key(s)</li>
                        <li>When - evaluated expresssion describing the context of when to execute the command</li>
                        <li>Command - the command to execute</li>
                    </ul>
                    <p>As an example a key binding to change to the Light Theme would be configured as follows:</p>
                    <pre>
                        <code>
        { "key": "ctrl+shift+l",
            "command": "workbench.action.changeToLightTheme" }
        </code>
                    </pre>
                    <h1>Language Features</h1>
                    <p>Code supports a plethora of languages to varying extents. It provides Syntax Coloring and Bracket matching
                        for many languages including:</p>
                    <ul>
                        <li>F#</li>
                        <li>Go</li>
                        <li>Java</li>
                        <li>HandleBars</li>
                        <li>Markdown</li>
                        <li>Objective-C</li>
                        <li>PowerShell</li>
                        <li>Razor</li>
                        <li>Ruby</li>
                        <li>SQL</li>
                        <li>XML</li>
                    </ul>
                    <p>It provides Syntax Coloring, Bracket Matching, Intellisense, linting and outlining for some languages
                        including the following:</p>
                    <ul>
                        <li>CSS</li>
                        <li>HTML</li>
                        <li>JavaScript</li>
                        <li>JSON</li>
                        <li>Less</li>
                        <li>Sass</li>
                    </ul>
                    <p>It provides Syntax Coloring, Bracket Matching, Intellisense, Linting, Outlining, Refactoring and Find
                        All References for the following languages:</p>
                    <ul>
                        <li>C#</li>
                        <li>TypeScript</li>
                    </ul>
                    <h2>HTML</h2>
                    <p>Emmet is built-in to Code so you can enter Emmet HTML shorthand and press Tab to let Code expand your
                        shorthand into full HTML as follows:</p>
                    <code>div&gt;ul&gt;li*4</code>
                    <p>Becomes a list with 4 list items included in a div.</p>
                    <h2>CSS</h2>
                    <p>When in CSS you can hover over various elements to get information on the elements to which they will
                        apply (e.g. this style will apply to any element that has a class of navbar that has a child element
                        (denoted by the *)).</p>
                    <p>The Goto Symbol command can be useful when navigating a CSS file. For example you can enter <code>@navbar .</code>                        in the Goto Symbol palette to show everything that starts with navbar that has a class after it (denoted
                        by the .).</p>
                    <h3>Intellisense and Emmet</h3>
                    <p>It is important to distinguish between the functionality provided by Intellisense and the functionality
                        provided by Emmet. For example if you type <code>ta</code> in a CSS file and then hit Tab Intellisense
                        will add a table-layout entry. You might have been trying to get Emmet to create a text-align entry.
                        To do so, type ta then hit escape to exit from Intellisense mode then press Tab as follows:</p>
                    <pre>
                        <code>
            .faker {
                text-align: left;
            }
        </code>
                    </pre>
                    <p>Emmet will then enter a text-align entry for you.</p>
                    <p>You can then cycle through the valid values for text-align by using Ctrl+Shift+, and Ctrl+Shift+.
                    <p>
                    <p>For text-align this will give you center, right, left and justify</p>
                    <h3>JSON</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>Markdown</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>C# and ASP.NET</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <p>You can run asp.net applications from within Visual Studio Code on the PC and on the MAC</p>
                    <h3>JavaScript</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>JavaScript Intellisense</h3>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h3>tsd</h3>
                    <p>TSD can be used to install typings files for TypeScript. You can install TSD using the Node Package
                        Manager as follows:</p>
                    <code>npm install tsd -g</code>
                    <p>You can then use the tsd interface to install typings files for the current project, the following
                        example install the angular and toastr typings files. jquery will also be installed because
                        angular and toastr are reliant on jquery:</p>
                    <code>tsd query -r -o -a install angular toastr --save</code>
                    <p>The flags have the following meanings:</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>-r</td>
                            <td>Recursive - install any additional typings files that this file relies on.</td>
                        </tr>
                        <tr>
                            <td>-o</td>
                            <td>Overwrite - overwrite any existing files</td>
                        </tr>
                        <tr>
                            <td>-a</td>
                            <td>Action - which in this example is install</td>
                        </tr>
                        <tr>
                            <td>--save</td>
                            <td>Store references to the installed typings files in the tsd.json file in the project</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>You can also add references to typings files using code hints by highlighting an unrecognized
                        symbol, clicking on the light bulb icon and selecting the 'Download type definition aaaa.d.ts'
                        where aaa is the name of the typings file that Code will download.</p>
                    <img src="./images/codehint.png" />
                    <p>When I do this I get a message as follows:</p>
                    <img src="./images/codehintmessage.png" />
                    <p>In order to get the intellisense and the typings file to work I had to add an entry in the jsonconfig.json
                        file as follows:</p>
                    <pre>
                                <code>
        {
            "compilerOptions": {
            "target": "ES5"
            },
            "files": [
                "typings/jquery/jquery.d.ts"
            ]
        }
        </code>
                            </pre>
                    <h3>ES6 Gulp</h3>
                    <p>npm install gulp -g</p>
                    <p>gulp serve</p>
                    <p>You can specify the version of EcmaScript in the jsconfig.json file. This is how Code knows what
                        intellisense to provide.</p>
                    <p>When you type task in the command palette Code will scan the project directory for task files
                        such gulpfile.js. These type of files have to adhere to a certain naming convention in order
                        for Code to find and process them.</p>
                    <h3>TypeScript</h3>
                    <p>Hover over a property and Code shows what it is.</p>
                    <p>Press Ctrl while hovering and Code displays a link</p>
                    <p>Click on the link to Go to definition.</p>
                    <p>Files in the same project are automotically scanned for symbols by VS Code. The typings files
                        are there to provide Intellisense etc. for third party libraries. These are all stored in
                        a typings folder within the project. The typings references get aggregated into a tsd.d.ts
                        file to enhance the development time experience.</p>
                    <p>There is an additional file related specifically to TypeScript call tsconfig.json which is used
                        to setup TypeScript specific configuration. Wherever this file is located is set to the TypeScript
                        project's root. You can have several tsconfig.json files within a project.</p>
                    <p>There is a good article on setting up the TypeScript compiler and configuring the tasks.json
                        file to run tsc here:
                        <a href="http://blogs.msdn.com/b/typescript/archive/2015/04/30/using-typescript-in-visual-studio-code.aspx">
                            http://blogs.msdn.com/b/typescript/archive/2015/04/30/using-typescript-in-visual-studio-code.aspx</a></p>
                    <h1>Version Control and Git</h1>
                    <strong>Document this section from the Pluralsight course</strong>
                    <h1>Debugging</h1>
                    <strong>Document this section from the Pluralsight course</strong>
                    <p>John Pappa uses VS Code to debug server side and Chrome development tools for debugging the client.
                    </p>
                    <h1>Integrating Code with External Tools via Tasks</h1>
                    <p>Use launch.json by clicking on the cog icon in debug viewlet to start a node application</p>
                    <p>You can use a gulpfile.js or grunt to run things like typescript compile, jshint, serve, browser
                        sync</p>
                    <p>Code can connect to tasks through the tasks.json file</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VisualStudioCode'
}
</script>

<style scoped>

</style>
