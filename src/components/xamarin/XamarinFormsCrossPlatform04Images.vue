<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Images</h2>
                </div>
                <div class="panel-body">
                    <h3>Introduction</h3>
                    <p>So at this point you know a simple way to load an image from a Url. In this section you are going to
                        learn various ways of adding images to your applications. You will learn about:</p>
                    <ul>
                        <li>How to control the caching of image downloaded from the internet</li>
                        <li>How to display an activity indicator when downloading images</li>
                        <li>Embed images with your application so they don't have to be downloaded evertyime</li>
                        <li>Adding Icons</li>
                        <li>Rendering images with round corners</li>
                    </ul>
                    <p>Let's get started.</p>
                    <h3>Image Sources</h3>
                    <p>Let's start with image sources. In Xamarin Forms apps we have two different types of images:</p>
                    <ul>
                        <li>Platform-independent (backgrounds)</li>
                        <li>Platform-specific (icons, splash screens)</li>
                    </ul>
                    <p>To include platform-independent images in our applications we have two options:</p>
                    <ul>
                        <li>We can download them using a URI or Uniform Resource Identifier</li>
                        <li>We can embed them in our Portable Class Library (PCL)</li>
                    </ul>
                    <p>If you want to work with platform-specific images (icons for buttons, toolbars etc.) you need to
                        include different images in each application project (Android, iOS, Windows etc.) Throughout the
                        rest of this section we will explore these image sources in more detail.</p>
                    <h3>Downloaded Images</h3>
                    <p>Add a new Content Page called ImagePage.xaml and delete the ContentPage.Content element, add padding
                        if required and set the MainPage property to this new page in the App.cs:</p>
                    <figure>
                        <pre class="prettyprint">MainPage = new UdemyXamarinForms.ImagePage();</pre>
                        <figcaption>Fig 04-001</figcaption>
                    </figure>
                    <p>In the ImagePage.xaml file add an Image element:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image Source=&quot;https://www.creativetorbay.com/media/creative-torbay/images/torquay-at-night.jpg&quot;  x:Name="image" /&gt;</pre>
                        <figcaption>Fig 04-002</figcaption>
                    </figure>
                    <p>Now let's look at what happens behind the scenes when you set the Source property to a Uri. In the
                        code-behind after the call to InitializeComponent() add the following code:</p>
                    <figure>
                        <pre class="prettyprint">image.Source</pre>
                        <figcaption>Fig 04-003</figcaption>
                    </figure>
                    <p>If we look at the type of the Source property we will see it is of type ImageSource:</p>
                    <figure>
                        <img src="./images/04/Fig04-004.png"/>
                        <figcaption>Fig 04-004</figcaption>
                    </figure>
                    <p>It is not a string. In XamarinForms we have different image sources. This ImageSource class is the
                        base for all of them. Also note that this is an abstract class so we can't create and ImageSource
                        like this:
                    </p>
                    <figure>
                        <pre class="prettyprint">new ImageSource()</pre>
                        <figcaption>Fig 04-005</figcaption>
                    </figure>
                    <p>Instead we need to use one of it's derivatives. When working with Uris we have two options:</p>
                    <ul>
                        <li>Use one of the factory methods on the ImageSource class:</li>
                        <ul>
                            <li>FormUri</li>
                            <li>FromFile</li>
                            <li>FromStream</li>
                            <li>FromResource</li>
                        </ul>
                        <li></li>
                    </ul>
                    <p>In this instance we can use FromUri:</p>
                    <figure>
                        <pre class="prettyprint">var imageSource = ImageSource.FromUri(new Uri(&quot;https://www.creativetorbay.com/media/creative-torbay/images/torquay-at-night.jpg&quot;));</pre>
                        <figcaption>Fig 04-006</figcaption>
                    </figure>
                    <p>Note that this method return an ImageSource (the abstract base class for all image sources) so we
                        need to explicitly cast this to a UriImageSource</p>
                    <p>As an alternative to the FromUri method we could create a UriImageSource by creating a new
                        UriImageSource directly, set the Uri and store the result in an imageSource object:</p>
                    <figure>
                        <pre class="prettyprint">var imageSource = new UriImageSource { Uri = new Uri(&quot;https://www.creativetorbay.com/media/creative-torbay/images/torquay-at-night.jpg&quot;) };</pre>
                        <figcaption>Fig 04-007</figcaption>
                    </figure>
                    <p>The UriImageSource object has a couple of interesting properties:</p>
                    <ul>
                        <li>CachingEnabled - true by default (24 hours is the default caching period)</li>
                        <li>CacheValidity - a TimeSpan object which specifies the duration for which our cache is valid (24
                            hours is the default caching period)
                        </li>
                    </ul>
                    <p>This means when you use Xaml to add an image to your application and you set the Source to a Uri the
                        Xaml parser will internally create the UriImageSource and because caching is enabled by default that
                        image is cached for 24 hours. Sometimes this is the desired result but sometimes you may wish to
                        disable caching. In those cases you cannot use Xaml. You need to go to code-behind, directly create
                        a UriImageSource object and set CachingEnabled to false:</p>
                    <figure>
                        <pre class="prettyprint">imageSource.CachingEnabled = false;</pre>
                        <figcaption>Fig 04-008</figcaption>
                    </figure>
                    <p>You can also specify how long the Cache is valid for by using the CacheVadility property:</p>
                    <figure>
                        <pre class="prettyprint">imageSource.CacheValidity = TimeSpan.FromHours(1);</pre>
                        <figcaption>Fig 04-008</figcaption>
                    </figure>
                    <p>Now that we have an ImageSource we can set the image object's Source property:</p>
                    <figure>
                        <pre class="prettyprint">image.Source = imageSource;</pre>
                        <figcaption>Fig 04-009</figcaption>
                    </figure>
                    <p>By the way, there is an implicit conversion from a string to UriImageSource. So if I set the
                        image.Source to Uri like this:</p>
                    <figure>
                        <pre class="prettyprint">image.Source = &quot;https://www.creativetorbay.com/media/creative-torbay/images/torquay-at-night.jpg&quot;;</pre>
                        <figcaption>Fig 04-010</figcaption>
                    </figure>
                    <p>This string will be implicitly converted to a UriImageSource and that's the reason we can set the
                        Source property of an Image element in Xaml to a string and it will be implicitly converted to a
                        UriImageSource.
                    </p>
                    <h3>Aspects</h3>
                    <p>Edit the ImagePage.xaml code-behind to look like this:</p>
                    <figure>
                    <pre class="prettyprint">var imageSource = new UriImageSource { Uri = new Uri(&quot;https://www.creativetorbay.com/media/creative-torbay/images/torquay-at-night.jpg&quot;) };
imageSource.CachingEnabled = false;
image.Source = imageSource;</pre>
                        <figcaption>Fig 04-011</figcaption>
                    </figure>
                    <p>Edit the Image element in Xaml to look like this:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image x:Name=&quot;image&quot; /&gt;</pre>
                        <figcaption>Fig 04-012</figcaption>
                    </figure>
                    <p>If I run the application now this is what we get:</p>
                    <figure>
                        <img src="./images/04/Fig04-013.png"/>
                        <figcaption>Fig 04-013</figcaption>
                    </figure>
                    <p>So this 1920 by 1080 image is scaled down to fit on the screen. This is known as AspectFit. The Image
                        object has a property called Aspect which is an enumeration with three members:</p>
                    <ul>
                        <li>AspectFill</li>
                        <li>AspectFit</li>
                        <li>Fill - which is the default</li>
                    </ul>
                    <p>This property can be set in code-behind or in Xaml. So in Xaml it would look like this:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image x:Name=&quot;image&quot; Aspect=&quot;Fill&quot; /&gt;</pre>
                        <figcaption>Fig 04-014</figcaption>
                    </figure>
                    <p>Which would result in the image being displayed like this:</p>
                    <figure>
                        <img src="./images/04/Fig04-015.png"/>
                        <figcaption>Fig 04-015</figcaption>
                    </figure>
                    <p>We can see the image is distorted - because we have a landscape image that is stretched to fit into
                        dimensions of this device.</p>
                    <p>We also have AspectFill which results in the image being displayed like this:</p>
                    <figure>
                        <img src="./images/04/Fig04-016.png"/>
                        <figcaption>Fig 04-016</figcaption>
                    </figure>
                    <p>The image fills the entire display area but the aspect is preserved - this results in an image that
                        is not distorted but will more than likely result in cropping. This is useful for displaying
                        background images.
                    </p>
                    <p>When displaying images from the internet sometimes it can take a short time before the image is
                        loaded. In those cases it is a good idea to display an activity indicator - which is like loader
                        icon in the center of the screen. This is the topic of the next lecture.</p>
                    <h3>Activity Indicator</h3>
                    <p>Now let's add an activity indicator on the page. Now, because we are going to have multiple elements
                        we are going to use the AbsoluteLayout because we want to position the activity indicator right in
                        the middle of the page:</p>
                    <figure>
                    <pre class="prettyprint">&lt;AbsoluteLayout&gt;
    &lt;Image x:Name=&quot;image&quot; Aspect=&quot;Fill&quot; /&gt;
&lt;/AbsoluteLayout&gt;</pre>
                        <figcaption>Fig 04-017</figcaption>
                    </figure>

                    <p>First of all we added an ActivityIndicator with the IsRunning element set to true (by default this is
                        false):</p>
                    <figure>
                        <pre class="prettyprint">&lt;ActivityIndicator IsRunning=&quot;true&quot;/&gt;</pre>
                        <figcaption>Fig 04-018</figcaption>
                    </figure>
                    <p>Now let's set the Attached Bindable Properties. For the X and Y coordinates we use proportional
                        values but for the width and height we specify absolute values :</p>
                    <figure>
                        <pre class="prettyprint">AbsoluteLayout.LayoutBounds=&quot;0.5, 0.5, 100, 100&quot;</pre>
                        <figcaption>Fig 04-019</figcaption>
                    </figure>
                    <p>Next we add the LayoutFlags Attached Bindable Property:</p>
                    <figure>
                        <pre class="prettyprint">AbsoluteLayout.LayoutFlags=&quot;PositionProportional&quot;</pre>
                        <figcaption>Fig 04-020</figcaption>
                    </figure>
                    <p>If we were to run the app now you wouldn't see the ActivityIndicator because the image would be
                        rendered on top of the ActivityIndicator. We can resolve this temporarily by setting the IsVisible
                        attribute of the Image attribute to false. So the XAML so far looks like this:</p>
                    <figure>
                    <pre class="prettyprint">    &lt;AbsoluteLayout&gt;
    &lt;ActivityIndicator
            IsRunning=&quot;true&quot;
            AbsoluteLayout.LayoutBounds=&quot;0.5, 0.5, 100, 100&quot; AbsoluteLayout.LayoutFlags=&quot;PositionProportional&quot;/&gt;
    &lt;Image x:Name=&quot;image&quot; Aspect=&quot;AspectFill&quot;/&gt;
&lt;/AbsoluteLayout&gt;</pre>
                        <figcaption>Fig 04-021</figcaption>
                    </figure>
                    <p>If we run the application now we will see the ActivityIndicator in the center of the screen:</p>
                    <figure>
                        <img src="./images/04/Fig04-022.png"/>
                        <figcaption>Fig 04-022</figcaption>
                    </figure>
                    <p>We can change the Color of the ActivityIndicator. First of all change the Color of the ContentPage to
                        black:
                    </p>
                    <figure>
                        <pre class="prettyprint">&lt;ContentPage BackgroundColor=&quot;Black&quot;</pre>
                        <figcaption>Fig 04-023</figcaption>
                    </figure>
                    <p>Then change the color of the ActivityIndicator to white:</p>
                    <figure>
                    <pre class="prettyprint">&lt;ActivityIndicator IsRunning=&quot;true&quot; Color=&quot;White&quot;</pre>
                        <figcaption>Fig 04-024</figcaption>
                    </figure>
                    <p>Now our application will look like this:</p>
                    <figure>
                        <img src="./images/04/Fig04-025.png"/>
                        <figcaption>Fig 04-025</figcaption>
                    </figure>
                    <p>Now we only want to show the ActivityIndicator when the Image is downloading so instead of setting
                        IsRunning to true we will use a Binding expression. I want to bind the IsRunning attribute of the
                        ActivityIndicator to the IsLoading attribute of the Image:</p>
                    <figure>
                    <pre class="prettyprint">IsRunning=&quot;{Binding Source={x:Reference image}, Path=IsLoading }&quot;</pre>
                        <figcaption>Fig 04-026</figcaption>
                    </figure>
                    <p>So our Binding expression starts with the Binding keyword inside curly braces. We specify the Source
                        using another Binding expression (and another set of curly braces). The second Binding expression
                        contains a Markup extension x:Reference which references the image element. Finally we set the Path
                        to IsLoading. This is a read-only property of the image. Whilst the image is being downloaded from
                        the internet IsLoading will be set to true and when the downloading has finished it will be
                        false.</p>
                    <p>Remove the IsVisible attribute from the Image and preview the app:</p>
                    <figure>
                        <img src="./images/04/Fig04-027.png"/>
                        <figcaption>Fig 04-027</figcaption>
                    </figure>
                    <p>The ActivityIndicator appears and is then hidden when the image is finished loading as expected.
                        However the Image is not filling the entire page. This is because we put it inside an AbsoluteLayout
                        and we have not set it's size. So we need to set the LayoutBounds Attached Bindable Property: </p>
                    <figure>
                        <pre class="prettyprint">AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot;</pre>
                        <figcaption>Fig 04-028</figcaption>
                    </figure>
                    <p>The numbers specified in the LayoutBounds (X, Y, Width, Height) are all proportional so we also
                        specify AbsoluteLayout.LayoutFlags="All":</p>
                    <figure>
                    <pre class="prettyprint">&lt;Image x:Name=&quot;image&quot; Aspect=&quot;AspectFill&quot;
    AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot;
    AbsoluteLayout.LayoutFlags=&quot;All&quot;/&gt;</pre>
                        <figcaption>Fig 04-029</figcaption>
                    </figure>
                    <p>Now if we check the result the ActiviyIndicator is displayed and when the image is loaded it fits as
                        expected:</p>
                    <figure>
                        <img src="./images/04/Fig04-030.png"/>
                        <figcaption>Fig 04-030</figcaption>
                    </figure>
                    <p>The finished Xaml Looks like this:</p>
                    <figure>
                    <pre class="prettyprint">&lt;AbsoluteLayout&gt;
    &lt;ActivityIndicator
            IsRunning=&quot;{Binding Source={x:Reference image}, Path=IsLoading }&quot;
            Color=&quot;White&quot;
            AbsoluteLayout.LayoutBounds=&quot;0.5, 0.5, 100, 100&quot; AbsoluteLayout.LayoutFlags=&quot;PositionProportional&quot;/&gt;
    &lt;Image x:Name=&quot;image&quot; Aspect=&quot;AspectFill&quot;
           AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot;
           AbsoluteLayout.LayoutFlags=&quot;All&quot;
    /&gt;
&lt;/AbsoluteLayout&gt;</pre>
                        <figcaption>Fig 04-031</figcaption>
                    </figure>
                    <p>Now downloading images is one way to add platform-independent images in your applications. It's
                        useful if you want your app to let the user browse some kind of photo gallery. A real-world example
                        of this is Facebook where you can browse different photos and as each photo is being downloaded you
                        see an activity indicator. However, in the app we have just built the image we are using is supposed
                        to be the background image of the app. It doesn't make sense to download it from the internet every
                        time. So in the next lecture we will demonstrate how to embed it in the Portable Class Library.</p>
                    <h3>Embedded Images</h3>
                    <p>First of all add another Content Page called EmbeddedImagesPage.xaml to your solution, remove the
                        ContentPage.Content element and add an Image element:</p>
                    <figure>
                    <pre class="prettyprint">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;ContentPage xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
             xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
             x:Class=&quot;UdemyXamarinForms.EmbeddedImagesPage&quot;&gt;
    &lt;Image x:Name=&quot;image&quot; Aspect=&quot;AspectFill&quot;/&gt;
&lt;/ContentPage&gt;</pre>
                        <figcaption>Fig 04-032</figcaption>
                    </figure>
                    <p>Now let's look at how to embed an image in your application. Add a new folder called Images to the
                        Shared/Portable Class Library project in the Solution. Right click the folder and select
                        Add>Existing Item and add an image to the folder. Click on the new file in the Solution Explorer and
                        in the Properties window set the Build Action to Embedded Resource.</p>
                    <p>The Udemy course mentions a Resource Id in Visual Studio but I couldn't find this.</p>
                    <p>By default you cannot set an embedded resource in xaml. We need to setup a custom markup extension
                        for that which is a topic for the next lecture. So go to the code-behind and add the following
                        code:</p>
                    <figure>
                        <pre class="prettyprint">image.Source = ImageSource.FromResource(&quot;UdemyXamarinForms.Images.torquay=at-night.jpg&quot;);</pre>
                        <figcaption>Fig 04-033</figcaption>
                    </figure>
                    <p>The resource id (allegedly consists of: </p>
                    <ul>
                        <li>The application name</li>
                        <li>The folder where the resource is located (Images)</li>
                        <li>The filename</li>
                    </ul>
                    <p>If we run the application we should see the image embedded in the application:</p>
                    <figure>
                        <img src="./images/04/Fig04-034.png"/>
                        <figcaption>Fig 04-034</figcaption>
                    </figure>
                    <p>I couldn't get the app described in this lecture working for the following reasons:</p>
                    <ul>
                        <li>As far as I can see there is no Resource Id in the properties window of Visual Studio</li>
                        <li>When using the fully qualified Resource Id described above the resource was not found - no
                            error/exception seemed to be thrown but I just got a blank page when the app ran.
                        </li>
                    </ul>
                    <p>I resolved this issue by following the instructions in this <a
                            href="https://forums.xamarin.com/discussion/17953/helpful-shared-project-image-information">
                        Xamarin Forum article</a>. Specifically the answer provided by DerekWinnicki</p>
                    <p>You have to edit the .projitems file by hand. You simply ensure your embedded resource includes the
                        "LogicalName" child element. The name provided there is what you would use in your code-behind:</p>
                    <figure>
                      /* eslint-disable no-alert, no-console */
                    <pre class="prettyprint">&amp;lt;ItemGroup&amp;gt;
    &amp;lt;EmbeddedResource Include=&amp;quot;$(MSBuildThisFileDirectory)Images\torquay-at-night.jpg&amp;quot;&amp;gt;
      &amp;lt;CopyToOutputDirectory&amp;gt;Always&amp;lt;/CopyToOutputDirectory&amp;gt;
      &amp;lt;LogicalName&amp;gt;torquay-at-night.jpg&amp;lt;/LogicalName&amp;gt;
    &amp;lt;/EmbeddedResource&amp;gt;
  &amp;lt;/ItemGroup&amp;gt;</pre>
                        <figcaption>Fig 04-035</figcaption>
                    </figure>
                  /* eslint-enable */
                    <p>The name used for the LogicalName becomes the resource identifier in your code:</p>
                    <figure>
                    <pre class="prettyprint">image.Source = ImageSource.FromResource(&quot;torquay-at-night.jpg&quot;);</pre>
                        <figcaption>Fig 04-036</figcaption>
                    </figure>
                    <p>Once this fix was in place the image was displayed and the app worked as desired.</p>
                    <p>Oddly the the following diagnostic code still failed to list the resource as found even though the
                        image now displays successfully:</p>
                    <figure>
                    <pre class="prettyprint">var assembly = typeof(EmbeddedImagesPage).GetType().Assembly;
    foreach (var res in assembly.GetManifestResourceNames())
        System.Diagnostics.Debug.WriteLine("found resource: " + res);</pre>
                        <figcaption>Fig 04-037</figcaption>
                    </figure>
                    <h3>Embedded Images in XAML</h3>
                    <p>Earlier I told you that if we set a Source here:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image Source=&quot;http://&quot; x:Name=&quot;image&quot; Aspect=&quot;AspectFill&quot;/&gt;</pre>
                        <figcaption>Fig 04-038</figcaption>
                    </figure>
                    <p>It will be interpreted as a Uri. This is why we can't use embedded images in Xaml. For that we need a
                        markup extension. Something like this:</p>
                    <figure>
                    <pre class="prettyprint">&lt;Image
    Source=&quot;{EmbeddedImage Source=torquay-at-night.jpg}&quot; x:Name=&quot;image2&quot;
    Aspect=&quot;AspectFill&quot;/&gt;</pre>
                        <figcaption>Fig 04-039</figcaption>
                    </figure>
                    <p>Above we named our Markup Extension EmbeddedImage and we also have an attribute called Source which
                        is set to the Resource Id of the Image.</p>
                    <p>So let's see how to create a Custom Markup Extension. First of all in the solution add a new folder
                        called MarkupExtensions. In this folder add a class called EmbeddedImage. Delete the constructor and
                        set the EmbeddedImage class to implement the IMarkupExtension interface (you will need to add a
                        reference to the Xamarin.Forms.Xaml namespace). </p>
                    <p>If you right click the interface and select implement interface one method called ProvideValue will
                        be stubbed out. The method should return an ImageSource so we could implement the method like this:
                    </p>
                    <figure>
                    <pre class="prettyprint">public object ProvideValue(IServiceProvider serviceProvider)
{
    return ImageSource.FromResource(&quot;torquay-at-night.jpg&quot;);
}</pre>
                        <figcaption>Fig 04-040</figcaption>
                    </figure>
                    <p>You might need to resolve the namespace for ImageSource (Xamarin.Forms).</p>
                    <p>Next, instead of hard coding the Resource Id we will make it a parameter. First of all in the Xaml
                        change the attribute name from Source to ResourceId:</p>
                    <figure>
                    <pre class="prettyprint">&lt;Image Source=&quot;{local:EmbeddedImage ResourceId=torquay-at-night.jpg}&quot;
    x:Name=&quot;image2&quot;/&gt;</pre>
                        <figcaption>Fig 04-041</figcaption>
                    </figure>
                    <p>Now in the EmbeddedImage class define a public property called ResourceId and use it in the
                        FromResource method instead of the hard coded string:</p>
                    <figure>
                    <pre class="prettyprint">public string ResourceId { get; set; }

public object ProvideValue(IServiceProvider serviceProvider)
{
    return ImageSource.FromResource(ResourceId);
}</pre>
                        <figcaption>Fig 04-042</figcaption>
                    </figure>
                    <p>We should also add logic to handle the scenario where the ResourceId supplied is a null or empty
                        string:</p>
                    <figure>
                    <pre class="prettyprint">public string ResourceId { get; set; }

public object ProvideValue(IServiceProvider serviceProvider)
{
    if (String.IsNullOrWhiteSpace(ResourceId))
        return null;

    return ImageSource.FromResource(ResourceId);
}</pre>
                        <figcaption>Fig 04-043</figcaption>
                    </figure>
                    <p>The markup extension is now complete. To use it in Xaml we must add a reference to the EmbeddedImage
                        markup extension. The convention is to use the local namespace. So we add local: in front of our
                        EmbeddedImage Markup Extension and we add the namespace declaration to the ContentPage element:</p>
                    <figure>
                    <pre class="prettyprint">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
    &lt;ContentPage xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
                 xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
                 x:Class=&quot;UdemyXamarinForms.EmbeddedImagesPage&quot;
                 xmlns:local=&quot;clr-namespace:UdemyXamarinForms&quot;&gt;
    &lt;!--&lt;Image x:Name=&quot;image1&quot; Aspect=&quot;AspectFill&quot; /&gt;--&gt;
    &lt;Image Source=&quot;{local:EmbeddedImage ResourceId=torquay-at-night.jpg}&quot; x:Name=&quot;image2&quot; Aspect=&quot;AspectFill&quot;/&gt;
&lt;/ContentPage&gt;</pre>
                        <figcaption>Fig 04-044</figcaption>
                    </figure>
                    <p>Let's add one more feature to make the Xaml a little bit cleaner. We can make the ResourceId what we
                        call the ContentProperty for Embedded Image. That means we can remove the ResourceId attribute from
                        the Xaml expression and the Xaml parser will still treat the string as a ResourceId by default:</p>
                    <figure>
                        <pre class="prettyprint">Image Source=&quot;{local:EmbeddedImage torquay-at-night.jpg}&quot; x:Name=&quot;image2&quot; Aspect=&quot;AspectFill&quot;/&gt;</pre>
                        <figcaption>Fig 04-045</figcaption>
                    </figure>
                    <p>For this to work we need to add an attribute in our EmbeddedImage class just above the class
                        definition itself:</p>
                    <figure>
                    <pre class="prettyprint">[ContentProperty(&quot;ResourceId&quot;)]
public class EmbeddedImage : IMarkupExtension
{</pre>
                        <figcaption>Fig 04-046</figcaption>
                    </figure>
                    <p>Next we will discuss Platform-specific images.</p>
                    <h3>Platform-specific Images</h3>
                    <p>Sometimes you need to work with images that are specific to each platform like the icons on buttons
                        and toolbars. This necessary because each of these platforms has it's own design guidelines.</p>
                    <p>So if you want to give your app the native look and feel for each platform you will want to use
                        platform-specific images.
                    </p>
                    <p>Add a new Content Page called ButtonPage.xaml for this lecture.</p>
                    <p>Now in this lecture we will look at how to add an icon to a button. I got the icon in question from
                        <a href="http://icons8.com">icons8</a></p>
                    <p>The resources for this lecture are separated into folders for each platform:</p>
                    <ul>
                        <li>iOS</li>
                        <ul>
                            <li>clock.png (32x32)</li>
                            <li>clock@2x.png (64x64)</li>
                            <li>clock@3x.png (96x96)</li>
                        </ul>
                        <li>Android</li>
                        <ul>
                            <li>drawable/ (32x32)</li>
                            <li>drawable-hdpi/ (48x48)</li>
                            <li>drawable-xhdpi/(64x64)</li>
                            <li>drawable-xxhdpi/ (96x96)</li>
                        </ul>
                        <li>Windows</li>
                        <ul>
                            <li>clock.png (32x32)</li>
                        </ul>
                    </ul>
                    <p>Both iOS and Android are capable of loading different image resolutions based on the target device.
                        So you know that newer phones have more pixel density which means you can display higher quality
                        images. That's why inside the iOS folder we have this clock icon at different resolutions. It's
                        worth noting the naming convention of our file names in iOS. The original clock file is 32x32
                        pixels. The next file has a suffix of @2x which is twice as big as the original file and then the
                        last file with a suffix of @3x which is 3 times the size of the original file. So whenever you want
                        to supply platform-specific images for iOS it's best to supply the same image in three different
                        sizes.</p>
                    <p>In Android we have a different naming convention - we use different folder names. Each of the folder
                        names start with drawable-. After that we describe the resolution of the images contained in that
                        folder - normal (no suffix), high dpi (hdpi), extra high dpi (xhdpi) and extra, extra high dpi
                        (xxhdpi).</p>
                    <p>Windows seems to offer inconsistent documentation. Some sources say you should specify different
                        resolution images whereas other documents deny this. For this example we will supply only one file
                        in the Windows folder.</p>
                    <p>One thing you need to know about Android is that the name of your file should only contain:</p>
                    <ul>
                        <li>Lowercase letters</li>
                        <li>Numbers</li>
                        <li>Underscore</li>
                        <li>Period</li>
                    </ul>
                    <p>Now let's demonstrate how to use these icons in our application. In Visual Studio Solution Explorer
                        locate the resources folder in the iOS project and add the three clock files specified above. Also
                        you might want to right click these files (Show all files) and select Include In Project.</p>
                    <p>With Android we also have a Resources folder. Inside this folder there are four subfolders that all
                        start with drawable. Add the relevant clock.png files into the different resolution folders.</p>
                    <p>Windows projects require you to place the files in the root of the project</p>
                    <p>Now that we have included our image in the different application projects we can add a button to our
                        ButtonPage.xaml with the Image set to clock.png:
                    </p>
                    <figure>
                <pre class="prettyprint">&lt;Button Image=&quot;clock.png&quot; /&gt;
                </pre>
                        <figcaption>Fig 04-047</figcaption>
                    </figure>
                    <p>If we run the application</p>
                    <figure>
                        <img src="./images/04/Fig04-048.png"/>
                        <figcaption>Fig 04-048</figcaption>
                    </figure>
                    <p>If you have a lot of images in your app you may want to organise them into different folders. Let's
                        demonstrate. Firstly add a Name attribute to your button:</p>
                    <figure>
                    <pre class="prettyprint">&lt;Button Image=&quot;clock.png&quot; x:Name=&quot;btn&quot;/&gt;</pre>
                        <figcaption>Fig 04-049</figcaption>
                    </figure>
                    <p>Now in the code-behind add the following code:</p>
                    <figure>
                        <pre class="prettyprint">btn.Image</pre>
                        <figcaption>Fig 04-050</figcaption>
                    </figure>
                    <p>If you look at the Type of the Image property it is FileImageSource. This is one of the derivatives
                        of ImageSource that we have seen earlier. If you wanted to create an FileImageSource you would use:</p>
                    <figure>
                        <pre class="prettyprint">btn.Image = (FileImageSource) ImageSource.FromFile(&quot;clock.png&quot;);</pre>
                        <figcaption>Fig 04-051</figcaption>
                    </figure>
                    <p>The FromFile is another static factory method on the ImageSource class.</p>
                    <p>Let's say that in our Windows Project we want to put our image files in a sub folder called images.</p>
                    <p>We can use the Device.OnPlatform method:</p>
                    <figure>
                <pre class="prettyprint">btn.Image = (FileImageSource) ImageSource.FromFile(
    Device.OnPlatform(
        iOS: &quot;clock.png&quot;,
        Android: &quot;clock.png&quot;,
        WinPhone: &quot;Images/clock.png&quot;
        ));</pre>
                        <figcaption>Fig 04-052</figcaption>
                    </figure>
                    <p>In this case I am overriding the path in the Windows project but you can use the same technique
                        to override the filename or it's path in iOS or Android Projects as well.</p>
                    <p>You can apply the same technique in Xaml:</p>
                    <figure>
<pre class="prettyprint">&lt;Button.Image&gt;
    &lt;OnPlatform x:TypeArguments=&quot;FileImageSource&quot;
                iOS=&quot;clock.png&quot;
                Android=&quot;clock.png&quot;
                WinPhone=&quot;Images/clock.png&quot;/&gt;
&lt;/Button.Image&gt;</pre>
                        <figcaption>Fig 04-053</figcaption>
                    </figure>
                    <p>We deleted the Source attribute and used Property Element Syntax to specify different images for
                        different platforms:</p>
                    <p>Because above image is not really a string it is a FileImageSource we set the TypeArguments to
                        FileImageSource. For different platforms we supply different values - as we did in the code-behind.
                        An implicit conversion takes place between the string values you supply to a FileImageSource Type.
                        That's why earlier on the Button element we could simply set the Image attribute to a string.
                    </p>
                    <p>Before we finish I would like to clarify something. Earlier I mentioned that there was an implicit
                        conversion between a string and a UriImageSource:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image Source=&quot;http://..&quot;/&gt;</pre>
                        <figcaption>Fig 04-054</figcaption>
                    </figure>
                    <p>and then later said there was an implicit conversion between a string and a FileImageSource:</p>
                    <figure>
                        <pre class="prettyprint">&lt;Image Source=&quot;clock.png&quot;/&gt;</pre>
                        <figcaption>Fig 04-055</figcaption>
                    </figure>
                    <p>How does XamarinForms know which way to parse the string. If the string starts with http:// it
                        will parse it into a UriImageSource otherwise it will parse it into a FileImageSource which means
                        a local file in each application project.</p>
                    <h3>Application Icons</h3>
                    <p>Now let me show you how to set application icons. I have only documented the part of the lecture
                        that deals with setting application icons in Visual Studio as Xamarin Studio is now deprecated.</p>
                    <p>For the iOS project double click Info.plist select Visual Assets and that's where my Version of
                        Visual Studio starts to differ from the course material - so I will have to look into this myself and
                        then document it at a later date.</p>
                    <h3>Rounded Images</h3>
                    <p>By default in XamarinForms we cannot display rounded images - we need a plugin for that. If you
                        just search for ImageCirclePlugin in Google you will find the GitHub page by James Montemagno along
                        with usage instructions.</p>
                    <p>First we need to add the plugin via Nuget from the following address Xam.Plugins.Forms.ImageCircle.
                        In Visual Studio we need to use Nuget to add this plugin to every project in our solution. So right
                        click on the solution and select Manage Nuget packages. Copy the address Xam.Plugins.Forms.ImageCircle
                        into the Search bar and then install the ImageCircle plugin against the Android and iOS projects.</p>
                    <p>Now in each application project we have a class that bootstraps our application. In iOS it's
                        AppDelegate.cs. In this class there is a method called FinishedLaunching:</p>
                    <figure>
                <pre class="prettyprint">public override bool FinishedLaunching(UIApplication app, NSDictionary options)
{
    global::Xamarin.Forms.Forms.Init ();
    LoadApplication (new UdemyXamarinForms.App ());

    return base.FinishedLaunching (app, options);
}</pre>
                        <figcaption>Fig 04-056</figcaption>
                    </figure>
                    <p>The first line of this method which calls Forms.Init() basically kickstarts Xamarin Forms. Next
                        we have a call to the LoadApplication method which passes an instance of the App class as an
                        argument - this is the App class that we have in the Portable Class Library. Finally we have a call
                        to the base.FinishedLaunching method.</p>
                    <p>After the call to the Init method we need to add the following code:</p>
                    <figure>
                        <pre class="prettyprint">ImageCircleRenderer.Init();</pre>
                        <figcaption>Fig 04-057</figcaption>
                    </figure>
                    <p>The ImageCircleRenderer is defined in ImageCircle.Forms.Plugin.iOS.</p>
                    <p>For Android we select MainActivity.cs in the OnCreate method there is a call to Forms.Init:</p>
                    <figure>
                <pre class="prettyprint">protected override void OnCreate (Bundle bundle)
{
    TabLayoutResource = Resource.Layout.Tabbar;
    ToolbarResource = Resource.Layout.Toolbar;

    base.OnCreate (bundle);

    global::Xamarin.Forms.Forms.Init (this, bundle);
    LoadApplication (new UdemyXamarinForms.App ());
}</pre>
                        <figcaption>Fig 04-058</figcaption>
                    </figure>
                    <p>So add the call to ImageCircleRenderer (dont forget to add the namespace):</p>
                    <figure>
<pre class="prettyprint">protected override void OnCreate (Bundle bundle)
{
    TabLayoutResource = Resource.Layout.Tabbar;
    ToolbarResource = Resource.Layout.Toolbar;

    base.OnCreate (bundle);

    global::Xamarin.Forms.Forms.Init (this, bundle);
    ImageCircleRenderer.Init();
    LoadApplication (new UdemyXamarinForms.App ());
}</pre>
                        <figcaption>Fig 04-059</figcaption>
                    </figure>
                    <p>You will need to add the ImageCircle.Forms.Plugin.Droid namespace.</p>
                    <p>For Windows projects if you open App.xaml.cs and locate the call to Forms.Init. Again after this
                        line you need to add the call to ImageCircleRenderer.Init().</p>
                    <p>Now let's add a new Content Page to the app called ImageCirclePage.xaml and add the following Xaml
                        (don't forget the XML namespace declaration - you can copy this from the github documentation):</p>
                    <figure>
                <pre class="prettyprint">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
                    &lt;ContentPage xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
                                 xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
                                 x:Class=&quot;UdemyXamarinForms.ImageCirclePage&quot;
                                 xmlns:local=&quot;clr-namespace:UdemyXamarinForms&quot;
                                 xmlns:ic=&quot;clr-namespace:ImageCircle.Forms.Plugin.Abstractions;assembly=ImageCircle.Forms.Plugin.Abstractions&quot;&gt;
    &lt;ic:CircleImage
            WidthRequest=&quot;100&quot;
            HeightRequest=&quot;100&quot;
            Aspect=&quot;AspectFill&quot;
            Source=&quot;{local:EmbeddedImage torquay-at-night.jpg}&quot;
            HorizontalOptions=&quot;Center&quot;
            VerticalOptions=&quot;Center&quot;
    /&gt;
&lt;/ContentPage&gt;</pre>
                        <figcaption>Fig 04-060</figcaption>
                    </figure>

                    <h3>Dealing with Sizes</h3>
                    <p>Let's wrap up this section with a lecture on sizes. So earlier when you worked with Padding I told
                        you these numbers were not in pixels:</p>
                    <figure>
                        <pre class="prettyprint">Padding=&quot;0, 20, 0, 0&quot;</pre>
                        <figcaption>Fig 04-061</figcaption>
                    </figure>
                    <p>I referred to them as units which is short for Device Independent Units. So let's see what this
                        means. </p>
                    <p>Here I've got a 400 by 300 pixel image displayed in an iPhone 6s: </p>
                    <figure>
                        <img src="./images/04/Fig04-062.png"/>
                        <figcaption>Fig 04-062</figcaption>
                    </figure>
                    <p>Now let's see what happens when we launch this application in an iPhone 6+ which is a newer model:</p>
                    <figure>
                        <img src="./images/04/Fig04-063.png"/>
                        <figcaption>Fig 04-063</figcaption>
                    </figure>
                    <p>Our image looks almost half the size. This is because newer phones tend to have a higher resolution
                        or higher pixel density. That means we have more pixels on the screen which means an image looks smaller
                        on a device with a higher resolution. The exact same concept applies in Android and Windows phones.</p>
                    <p>Now when building cross-platform apps we want our apps to look more or less the same across
                        different devices irrespective of their pixel dimensions. That's why we have this concept called
                        device independent units.</p>
                    <p>So in Xamarin Forms whenever you are working with sizes you are working with device independent
                        units instead of pixels. Now depending on the target platform a unit can be converted to 1, 2 or 3
                        pixels.
                    </p>
                    <p>So let's say we had a BoxView and we set it's WidthRequest and HeightRequest to 160. If you launch
                        your application in an iPhone 6s because we have 2 pixels to the unit the BoxView will be 320 by 320
                        pixels. On an iPhone 6+ because we 3 pixels to the unit our BoxView will be 480 by 480 pixels. Now if
                        we put the screen shots next to each other we will see our BoxView is almost the same size on each
                        different device:</p>
                    <figure>
                        <img src="./images/04/Fig04-064.png"/>
                        <figcaption>Fig 04-064</figcaption>
                    </figure>
                    <p>Generally speaking as a Xamarin Forms programmer you should not worry about the actual size of the
                        elements on the screen. Instead you work with Device Independent Units and let the OS decide how to
                        deal with the actual sizes while rendering elements.</p>
                    <p>One last thing - 160 Units is a key number. Generally it translates to 1 inch. So if you want the
                        width and or height of an element to be 1 inch you can set it to 160 units.</p>
                    <h3>Cheat Sheet</h3>
                    <p></p>
                    <h3>Exercise - Photo Gallery</h3>
                    <p></p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'XamarinFormsCrossPlatform04Images'
}
</script>

<style scoped>

</style>
