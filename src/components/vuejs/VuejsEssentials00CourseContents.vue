<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Course Contents</h2>
                </div>
                <div class="panel-body">
                    <ul>
                        <router-link to="/vuejsessentials-01-an-introduction-to-vue" active-class="active"><a>An Introduction to Vue</a></router-link>
                        <ol>
                            <li>How to Get Help</li>
                            <li>Our First Vue App</li>
                            <li>App Overview</li>
                            <li>A Codepen Starter</li>
                            <li>Vue Templates and Instances</li>
                            <li>Creating the Template</li>
                            <li>Linking Templates and Instances</li>
                            <li>Step by Step Implementation</li>
                            <li>Defining Instance Methods</li>
                            <li>Defining Vue Directives</li>
                            <li>Retrieving Event Information</li>
                            <li>Imperative vs Declarative Programming</li>
                            <li>Declarative Apps with the Vue API</li>
                            <li>Data, Computed, and Methods</li>
                            <li>Updated Data Values</li>
                            <li>Computed Properties</li>
                            <li>Review from Start to Finish</li>
                            <li>Template Placement</li>
                            <li>Referencing Data in the Template</li>
                            <li>Expressions in Templates</li>
                            <li>Coding Exercise 1 Rendering with String Templates</li>
                            <li>Coding Exercise 2 JS Expressions with String Templates</li>
                        </ol>
                        <router-link to="/vuejsessentials-02-moving-on-with-vue-cli" active-class="active"><a>Moving on with Vue CLI</a></router-link>
                        <ol start="23">
                            <li>App Overview</li>
                            <li>App Challenges</li>
                            <li>Generating a New Project</li>
                            <li>Why Use Vue CLI?</li>
                            <li>Project Walkthrough</li>
                            <li>Vue Files</li>
                            <li>Behind the Scenes of Vue Files</li>
                            <li>Vue Components vs Vue Instances</li>
                        </ol>
                        <router-link to="/vuejsessentials-03-writing-effective-apps" active-class="active"><a>Writing Effective Apps</a></router-link>
                        <ol start="31">
                            <li>Starting from Scratch</li>
                            <li>The App Component</li>
                            <li>Another Way of Specifying Content</li>
                            <li>Multiple Ways of DOM Attachment</li>
                            <li>Making the SearchBar</li>
                            <li>Nesting Components</li>
                            <li>Event Directives</li>
                            <li>Shorthand Event Syntax</li>
                            <li>Data Sharing Between Components</li>
                            <li>Communication with Props and Events</li>
                            <li>Emitting Events</li>
                            <li>Listening for Custom Events</li>
                            <li>Youtube API Signup</li>
                            <li>Searching Youtube</li>
                            <li>Investigating Video Responses</li>
                            <li>Rendering a List of Videos</li>
                            <li>Updating Data Causes Rerenders</li>
                            <li>Data in Components vs Instances</li>
                            <li>Updating Data</li>
                            <li>Communicating from Parent to Child</li>
                            <li>Prop Validation</li>
                            <li>Separate List Components</li>
                            <li>Lists with V-For</li>
                            <li>Handling Props with V-For</li>
                            <li>Keys with V-For</li>
                            <li>Including Bootstrap Styling</li>
                            <li>Styling the Search Bar</li>
                            <li>Styling the Video List</li>
                            <li>Thumbnail Image Reference</li>
                            <li>Thumbnail by Computed Property</li>
                            <li>More List Item Styling</li>
                            <li>Handling Nested Clicks</li>
                            <li>Event Handling in the VideoList</li>
                            <li>Receiving Events in the App</li>
                            <li>Passing Props to the Video Detail</li>
                            <li>Updating Data</li>
                            <li>The V-If Directive</li>
                            <li>Referencing Video Title and Description</li>
                            <li>Crafting the Embed URL</li>
                            <li>Responsive Embeds</li>
                            <li>Two Column Layout</li>
                            <li>App Review</li>
                            <li>Coding Exercise 3 Events and Methods</li>
                            <li>Coding Exercise 4 Component Data</li>
                            <li>Coding Exercise 5 Events, Data, and Directives</li>
                        </ol>
                        <router-link to="/vuejsessentials-04-handling-state-with-vuex" active-class="active"><a>Handling State with Vuex</a></router-link>
                        <ol start="75">
                            <li>App Overview</li>
                            <li>App Challenges</li>
                            <li>Additional Dependencies</li>
                            <li>A Bit of Boilerplate</li>
                            <li>Building the Header</li>
                            <li>Including Semantic UI</li>
                            <li>Styling the Header</li>
                            <li>Imgur Overview</li>
                        </ol>
                        <router-link to="/vuejsessentials-05-authentication-in-vue-with-oauth2" active-class="active"><a>Authenticating in Vue with OAuth2</a></router-link>

                        <ol start="83">
                            <li>OAuth Overview</li>
                            <li>Imgur API Signup</li>
                            <li>Handling App Logic</li>
                            <li>Vuex Introduction</li>
                            <li>Vuex Modules</li>
                            <li>Connecting Vuex to Vue</li>
                            <li>Initial Auth Module Design</li>
                            <li>Auth Module Mutations</li>
                            <li>Auth Module State and Getters</li>
                            <li>Updating State Values</li>
                            <li>Logging Out with Actions</li>
                            <li>Separate API Helpers</li>
                            <li>Forming the OAuth2 URL</li>
                            <li>Initiating the Login Flow</li>
                            <li>Wiring the Auth Module</li>
                            <li>Initial OAuth Request</li>
                            <li>Extracting the Access Token</li>
                        </ol>
                        <h3>Navigation with Vue Router</h3>
                        <ol start="100">
                            <li>Wiring up Vue Router</li>
                            <li>Browser vs Hash Routers</li>
                            <li>Component Insertion Point</li>
                            <li>Component Lifecycle Methods</li>
                            <li>Calling Actions</li>
                            <li>Parsing the Access Token</li>
                            <li>Data in Components with MapGetters</li>
                            <li>The V-Else Directive</li>
                            <li>Persisting Login State</li>
                            <li>Button Styling</li>
                            <li>Logging Out Users</li>
                            <li>Automatic Component Updates</li>
                            <li>Clearing LocalStorage Tokens</li>
                            <li>Programmatic Navigation</li>
                            <li>Additional Route Config</li>
                            <li>Navigation with Router-Link</li>
                        </ol>
                        <h3>Design of Vuex Modules</h3>
                        <ol start="116">
                            <li>Image Module Design</li>
                            <li>Module Implementation</li>
                            <li>Fetch Images API Documentation</li>
                            <li>Fetching Images</li>
                            <li>Communicating Across Modules</li>
                            <li>Testing Images Response</li>
                            <li>Image Upload via Imgur</li>
                            <li>Committing Images to State</li>
                            <li>Mapping the Images Getter</li>
                            <li>Listing Images</li>
                        </ol>
                        <h3>Handling Image Upload</h3>
                        <ol start="126">
                            <li>Image Upload Overview</li>
                            <li>Upload Form HTML</li>
                            <li>Styling the Upload Form</li>
                            <li>The Upload Images Action</li>
                            <li>File Change Event</li>
                            <li>Accepting Multiple Image Files</li>
                            <li>The Path to Upload</li>
                            <li>Attaching Images with FormData</li>
                            <li>Concurrent Uploads</li>
                            <li>Layout with CSS Grid</li>
                            <li>Hide Images on Logout</li>
                            <li>Expanding the App</li>
                        </ol>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VuejsEssentials00CourseContents.vue"
    }
</script>

<style scoped>

</style>