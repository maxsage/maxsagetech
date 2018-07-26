<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Handling State with Vuex</h2>
                </div>
                <div class="panel-body">
                    <h3>OAuth Overview</h3>
                    <p>In the last section we started doing a little bit of a detour away from the AppHeader
                        component to discuss the Imgur API. We are going to continue our detour by discussing how we
                        are going to make use of the Imgur API to handle authentication inside of our application.
                    </p>
                    <p>The following diagram illustrates the flow of authenticating our users through the Imgur API:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-001.png"/>
                        <figcaption>Fig 05-001</figcaption>
                    </figure>
                    <p>So this is a high level overview of the general flow that you and I are going to use. We are
                        making a very big assumption that the users of our application already have an Imgur account
                        . You and I are not going to have to require users to enter emails or passwords to identify
                        themselves because they will have already done that through the Imgur service. So we are
                        going to rely on Imgur's Authentication system to also authenticate users inside of our app
                        as well.
                    </p>
                    <p>If you have seen the buttons that say Login with Facebook or Login with Google you will have
                        experienced an OAuth flow in action. So applications that show those buttons delegate our
                        the process of authenticating the user to some outside service like Facebook, Google, Linked
                        In or Imgur. </p>
                    <p>So everythings going to begin by a user coming to our application and clicking the Login
                        button at which point we will forcibly navigate our users over to the Imgr OAuth flow. This
                        means we literally change the Url inside the users browser to go to a page on the Imgur
                        website that tells Imgur that we are attempting to authenticate the user inside of our
                        application. The user will be prompted with a message that the Image Storage application want
                        to get access to your account for the purposes of authentication. They can either allow this
                        or not. </p>
                    <p>Assuming the user authorizes Imgur to allow access to the Image Store application Imgur will
                        redirect the user back to our application - changing the Url back to our application. When
                        the redirect is performed Imgur inserts a token at the end of the Url. This is a string of
                        random numbers and letters that defines that this application has been given access to this
                        users account and has the ability to perform certain actions on the Imgur web site on behalf
                        of the user such as uploading images.</p>
                    <h3>Imgur API Signup</h3>
                    <p>In this section we're going to create a new Imgur account which is going to allow us to sign
                        up for a developer set of credentials to work with the Imgur API directly.</p>
                    <p>On the Imgur website click the Signup button and provide the required details. This will
                        create a regular user account. To enable a developer account with API keys we need to
                        <a href="https://apidocs.imgur.com/">register our application</a> - the link to do this is
                        available from the Imgur documentation. Enter the following details:
                    </p>
                    <table>
                        <tr>
                            <td>Application Name</td>
                            <td>Vue Image Storage App</td>
                        </tr>
                        <tr>
                            <td>Authorization Type</td>
                            <td>OAuth 2 authorization with a callback URL</td>
                        </tr>
                        <tr>
                            <td>Authorization callback URL</td>
                            <td>http://localhost:8080/oauth2/callback</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>maxsage@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>Test application for Image upload</td>
                        </tr>
                    </table>
                    <p>We get a Client ID and Client secret which should be copied to Notepad. The Client ID
                        identifies our application to Imgur and the Client Secret allows us to do some more secure
                        actions on the Imgur API.</p>
                    <p>That completes our signup for Imgur API. Next we will implement the OAuth flow.</p>
                    <h3>Handling App Logic</h3>
                    <p>Now we will write the actual code that will let a use navigate over to the Imgur flow, send
                        them back to our application with a token and then presumably do some interesting things
                        inside of our application.</p>
                    <p>One consideration is where to place all the code for handling this authentication flow.</p>
                    <p>If we think back to our VideoBrowser application you'll remember we had the App component,
                        VideoDetail, VideoList, VideoListItem and the SearchBar. When it came to state or data
                        inside of our application it was all concentrated inside of the App component - so it stored
                        the list of videos and the currently selected video.</p>
                    <p>It was very simple to have the App in charge of knowing the currently selected video because
                        it could then very easily communicate that down to the VideoDetail and each time the user
                        clicked on a video from the VideoListItem that got communicated up to the App.</p>
                    <p>However, as we start to work on this App, things are bit different. The following diagram
                        details some of the components:</p>
<figure>
  <img src="./images/vuejsessentials/Fig05-002.png"/>
  <figcaption>Fig 05-002.png</figcaption>
</figure>
                    <p>In total we are probably going to end up with fewer components than in the VideoBrowser
                        application. However the amount of information that is going to be exchanged between these
                        components is going to be dramatically increased.</p>
                    <p>We are going to have the token which needs to be known by the App component so that it can
                        modify the display of the AppHeader. In addition the ImageList will need to know whether the
                        user is signed in and if so who they are so that the ImageList can fetch the list of images
                        that have been uploaded by the user. And then finally the UploadForm definitely needs to know
                        about the token and wheter the user is logged in or not because we have to use that token to
                        actually handle image upload over to the Imgur API.
                    </p>
                    <p>So even though it might still sound like all the components are just using pieces of
                        information that can be handled by the App component consider if the application was to grow
                    in complexity:</p>
<figure>
  <img src="./images/vuejsessentials/Fig05-003.png"/>
  <figcaption>Fig 05-003</figcaption>
</figure>
                    <p>So maybe inside of the app you've got the AppHeader which has some AuthButtons and
                        ProfileImage components. Perhaps the UploadForm has some fancy drag and drop functionality
                        or progress bar tied to it that you add to an ImageUploader component. Maybe the
                        ImageListItem component shows comments and for each comment we display a ProfileImage
                        component as well.
                    </p>
                    <p>If you think about the above component structure and consider how you would share whether or
                        not a user was logged in throughout all of these components you can start to see how that
                        would be a little bit of a hassle.</p>




                    <h3>Vuex Introduction</h3>
                    <h3>Vuex Modules</h3>
                    <h3>Connecting Vuex to Vue</h3>
                    <h3>Initial Auth Module Design</h3>
                    <h3>Auth Module Mutations</h3>
                    <h3>Auth Module State and Getters</h3>
                    <h3>Updating State Values</h3>
                    <h3>Logging Out with Actions</h3>
                    <h3>Separate API Helpers</h3>
                    <h3>Forming the OAuth2 URL</h3>
                    <h3>Initiating the Login Flow</h3>
                    <h3>Wiring in the Auth Module</h3>
                    <h3>Initial OAuth Request</h3>
                    <h3>Extracting the Access Token</h3>

                </div>

            </div>
        </div>
    </div>
</template>
