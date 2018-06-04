<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Layouts</h2>
                </div>
                <p class="panel-body">
                <h3>Introduction</h3>
                <p>In Xamarin Forms we have this concept called Layout which we use for arranging visual elements on screen.
                    In this lecture we will look at how to integrate Layouts into XamarinForms to build various user
                    interfaces.
                </p>
                <h3>Stack Layout in XAML</h3>
                <p>Add a new Xaml file (Forms ContentPage Xaml) to the project from the last lecture called StackPage. We
                    get two new files - a Xaml file and a C# code-behind file.
                </p>
                <p>In the App.cs class file change the MainPage to StackPage:</p>
                <figure>
                    <pre class="prettyprint"><code>MainPage = new StackPage();</code></pre>
                    <figcaption>Fig 03-001</figcaption>
                </figure>
                <p>In our new StackPage we apply some padding:</p>
                <figure>
                    <pre class="prettyprint"><code>Padding=&quot;0, 20, 0, 0&quot;</code></pre>
                    <figcaption>Fig 03-002</figcaption>
                </figure>
                <p>This padding will apply to all platforms. I could use the OnPlatform element to apply this padding just
                    to iOS.
                </p>
                <p>Next remove the ContentPage.Content element and add three labels:</p>
                <figure>
                <pre class="prettyprint"><code>&lt;Label Text=&quot;Label 1&quot; /&gt;
&lt;Label Text=&quot;Label 2&quot; /&gt;
&lt;Label Text=&quot;Label 3&quot; /&gt;</code></pre>
                    <figcaption>Fig 03-003</figcaption>
                </figure>
                <p>If we run the application we will only see Label 3:</p>
                <figure>
                    <img src="./images/03/Fig03-004.png"/>
                    <figcaption>Fig 03-004</figcaption>
                </figure>
                <p>The reason for this is that inside ContentPage we can only have one element or child. In order to add
                    more than one element to a page, as is the case in most real world apps, we need to use a Layout. In
                    this lecture we are going to explore the StackLayout which is one of the simplest layouts.
                </p>
                <p>Wrap the three Labels inside a StackLayout:</p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout&gt;
    &lt;Label Text=&quot;Label 1&quot; /&gt;
    &lt;Label Text=&quot;Label 2&quot; /&gt;
    &lt;Label Text=&quot;Label 3&quot; /&gt;
&lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-005</figcaption>
                </figure>
                <p>With a StackLayout we can position multiple layouts in a line - vertically or horizontally. If we run the
                    application now we will see all three labels:
                </p>
                <figure>
                    <img src="./images/03/Fig03-006.png"/>
                    <figcaption>Fig 03-006</figcaption>
                </figure>
                <p>Now let's apply a background colour to our StackLayout:</p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout BackgroundColor=&quot;Yellow&quot;&gt;
    &lt;Label Text=&quot;Label 1&quot; /&gt;
    &lt;Label Text=&quot;Label 2&quot; /&gt;
    &lt;Label Text=&quot;Label 3&quot; /&gt;
&lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-006</figcaption>
                </figure>
                <p>If we run our application now we will see that the StackLayout is taking up the whole page even though
                    there are only three items:
                </p>
                <figure>
                    <img src="./images/03/Fig03-007.png"/>
                    <figcaption>Fig 03-007</figcaption>
                </figure>
                <p>By default StackLayout fills it's parent/container. However if we go back to the Xaml and set the
                    VerticalOptions property of the StackLayout to any value other than Fill (which is the default), for
                    example Center:
                </p>
                <figure>
                    <pre class="prettyprint"><code>&lt;StackLayout BackgroundColor=&quot;Yellow&quot; VerticalOptions=&quot;Center&quot;&gt;</code></pre>
                    <figcaption>Fig 03-008</figcaption>
                </figure>

                <figure>
                    <img src="./images/03/Fig03-009.png"/>
                    <figcaption>Fig 03-009</figcaption>
                </figure>
                <p>vertically our StackLayout is in the middle of the screen and is no longer stretching to fill it's
                    parent. It's height is now determined based on the height of it's children (in this case the three
                    labels). Note that horizontally it is still stretching to fill it's container. We can go back to the
                    Xaml and enter HorizontalOptions:
                </p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout BackgroundColor=&quot;Yellow&quot; VerticalOptions=&quot;Center&quot; HorizontalOptions=&quot;Center&quot;&gt;
        &lt;Label Text=&quot;Label 1&quot; /&gt;
        &lt;Label Text=&quot;Label 2&quot; /&gt;
        &lt;Label Text=&quot;Label 3&quot; /&gt;
    &lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-009</figcaption>
                </figure>
                <p>Now the StackLayout will be in the middle of the devices screen.</p>
                <p>Next let's apply a background colour to each of the labels:</p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout BackgroundColor=&quot;Yellow&quot; VerticalOptions=&quot;Center&quot; HorizontalOptions=&quot;Center&quot;&gt;
        &lt;Label Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-010</figcaption>
                </figure>
                <p>If we run the application now you will notice a small gap between each label:</p>
                <figure>
                    <img src="./images/03/Fig03-011.png"/>
                    <figcaption>Fig 03-011</figcaption>
                </figure>
                <p>We can change this using the StackLayout Spacing property:</p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout Spacing=&quot;20&quot; BackgroundColor=&quot;Yellow&quot; VerticalOptions=&quot;Center&quot; HorizontalOptions=&quot;Center&quot;&gt;
        &lt;Label Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-012</figcaption>
                </figure>
                <p>The default Spacing value is 6 units.</p>
                <p>There is a similar property called padding:</p>
                <figure>
                <pre class="prettyprint"><code> &lt;StackLayout Padding=&quot;40&quot;
            Spacing=&quot;20&quot;
            BackgroundColor=&quot;Yellow&quot;
            VerticalOptions=&quot;Center&quot;
            HorizontalOptions=&quot;Center&quot;&gt;
        &lt;Label Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
        &lt;Label Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-013</figcaption>
                </figure>
                <p>Padding is the amount of space between a Layout and it's children:</p>
                <figure>
                    <img src="./images/03/Fig03-014.png"/>
                    <figcaption>Fig 03-014</figcaption>
                </figure>
                <p>If you only wanted padding on one side (e.g. the Top) you set the Property as follows (Left, Top, Right,
                    Bottom):
                </p>
                <figure>
                    <pre class="prettyprint"><code>Padding=&quot;0, 40, 0, 0&quot;</code></pre>
                    <figcaption>Fig 03-015</figcaption>
                </figure>
                <p>Another property of StackLayout is Orientation. The default value is Vertical. If we set this property to
                    horizontal:
                </p>
                <figure>
                <pre class="prettyprint"><code>&lt;StackLayout Padding=&quot;40&quot;
            Spacing=&quot;20&quot;
            VerticalOptions=&quot;Center&quot;
            HorizontalOptions=&quot;Center&quot;
            Orientation=&quot;Horizontal&quot;&gt;
        &lt;Label Text=&quot;Label 1&quot; /&gt;
        &lt;Label Text=&quot;Label 2&quot; /&gt;
        &lt;Label Text=&quot;Label 3&quot; /&gt;
    &lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-016</figcaption>
                </figure>
                <p>it results in a Layout like this:</p>
                <figure>
                    <img src="./images/03/Fig03-017.png"/>
                    <figcaption>Fig 03-017</figcaption>
                </figure>
                <p>We can also nest StackLayouts inside other StackLayouts. For example imagine you want to put an image or
                    an Icon right above Label 1:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;StackLayout Padding=&quot;40&quot;
        Spacing=&quot;20&quot;
        BackgroundColor=&quot;Yellow&quot;
        VerticalOptions=&quot;Center&quot;
        HorizontalOptions=&quot;Center&quot;
        Orientation=&quot;Horizontal&quot;&gt;
    &lt;StackLayout&gt;
        &lt;Image Source=&quot;http://placehold.it/100x100&quot; /&gt;
        &lt;Label Text=&quot;Label 1&quot; /&gt;
    &lt;/StackLayout&gt;
    &lt;Label Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
&lt;/StackLayout&gt;</code></pre>
                    <figcaption>Fig 03-018</figcaption>
                </figure>
                <p>We have a main StackLayout which has a Horizontal orientation and inside that we have another StackLayout
                    which is Vertical where the Icon and Label 1 are located.
                </p>
                <p>So to recap, we use StackLayout to position multiple elements in a single line either horizontally or
                    vertically. The key properties of StackLayout you need to know are:
                </p>
                <ul>
                    <li>Orientation</li>
                    <li>Padding</li>
                    <li>Spacing</li>
                    <li>VerticalOptions</li>
                    <li>HorizontalOptions</li>
                </ul>
                <h3>Stack Layout in Code</h3>
                <p>As discussed previously, we use Xaml to define user interfaces most of the time. Sometimes, if you are
                    creating dynamic interfaces, you may have to do things in code. Let's see how to create a StackLayout in
                    code-behind. Firsly comment out the StackLayout in Xaml. In the code-behind after the call to
                    InitializeComponent() create a variable called layout and assign it to a new StackLayout setting it's
                    Spacing, Padding and Orientation:
                </p>
                <figure>
<pre class="prettyprint"><code>var layout = new StackLayout
{
    Spacing = 40,
    Padding = new Thickness(0, 20, 0, 0),
    Orientation = StackOrientation.Horizontal
};</code></pre>
                    <figcaption>Fig 03-019</figcaption>
                </figure>
                <p>StackLayout has a property called Children. You can add multiple elements inside children (e.g. Label or
                    even another StackLayout):
                </p>
                <figure>
                    <pre class="prettyprint"><code>layout.Children.Add(new Label { Text = &quot;Label 1&quot; });</code></pre>
                    <figcaption>Fig 03-020</figcaption>
                </figure>
                <p>Finally, once we have initialized our layout we set the Content property to the layout object:</p>
                <figure>
                    <pre class="prettyprint"><code>Content = layout;</code></pre>
                    <figcaption>Fig 03-021</figcaption>
                </figure>
                <p>If you compare the code-behind with the Xaml we created in the previous lecture we can see that creating
                    Layouts or user interfaces in code is a little bit verbose. That's why I always prefer to do things in
                    Xaml if possible.
                </p>
                <h3>Stack Layout Exercise</h3>
                <p></p>
                <h3>Grid in XAML</h3>
                <p>So as we discussed in the previous lecture we use StackLayout to position elements in a line - either
                    horizontally or vertically. Another Layout we have is Grid which we use to position elements in rows and
                    columns. Real world examples of where Grids are used include:
                </p>
                <ul>
                    <li>Keypads</li>
                    <li>Calculators</li>
                    <li>Calendars</li>
                    <li>Metro-stle Designs (Win8)</li>
                    <li>Photo albums</li>
                </ul>
                <p>To demonstrate create a new Content Page called GridPage and again in the App.cs file set the MainPage to
                    GridPage. In the GridPage XAML let's add a Padding, remove the ContentPage.Content element and instead
                    add a Grid element:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;ContentPage xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
             xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
             x:Class=&quot;UdemyXamarinForms.GridPage&quot;
             Padding=&quot;0, 20, 0, 0&quot;&gt;
    &lt;Grid&gt;
    &lt;/Grid&gt;
&lt;/ContentPage&gt;</code></pre>
                    <figcaption>Fig 03-022</figcaption>
                </figure>
                <p>Inside the Grid we layout four labels in two rows and two columns:</p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;Label Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Text=&quot;Label 4&quot; BackgroundColor=&quot;Silver&quot; /&gt;
&lt;/Grid&gt;</code></pre>
                    <figcaption>Fig 03-023</figcaption>
                </figure>
                <p>Now we need to put each label in a particular row and column in the Grid. For this we use a special
                    syntax:
                </p>
                <figure>
                    <pre class="prettyprint"><code>&lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;</code></pre>
                    <figcaption>Fig 03-024</figcaption>
                </figure>
                <p>It's important to note that the Column and Row properties do not belong to the Label class. To illustrate
                    if you go to the code-behind and declare a Label:
                </p>
                <figure>
                    <pre class="prettyprint"><code>Label l;</code></pre>
                    <figcaption>Fig 03-025</figcaption>
                </figure>
                <p>And then type l.Row or l.Column. You will see the Label doesn't have those properties. These properties
                    are known as Attached Bindable Properties which means they are defined by the Grid class but can be set
                    by other classes. With this technique we can put any elements inside the Grid and assign them a row and
                    a column in the Grid.
                </p>
                <p>Next assign the other Labels to different rows and columns and add a background color of the Grid:</p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid BackgroundColor=&quot;Yellow&quot;&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 4&quot; BackgroundColor=&quot;Silver&quot; /&gt;
&lt;/Grid&gt;</code></pre>
                    <figcaption>Fig 03-026</figcaption>
                </figure>
                <p>You will notice that, similar to the StackLayout, the Grid expands to fill it's container - so it takes
                    up all the space on the page. Also each of our Labels stretch to fill the containing row and column. Now
                    you see a yellow line that separates rows and columns. This is because of the default spacing between
                    rows and columns in the Grid. We can set the spacing using the RowSpacing and ColumnSpacing properties
                    like this:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid BackgroundColor=&quot;Yellow&quot;
    RowSpacing=&quot;40&quot;
    ColumnSpacing=&quot;40&quot;&gt;</code></pre>
                    <figcaption>Fig 03-027</figcaption>
                </figure>
                <p>The result looks like this:</p>
                <figure>
                    <img src="./images/03/Fig03-028.png"/>
                    <figcaption>Fig 03-028</figcaption>
                </figure>
                <p>To illustrate another feature of the Grid let's add another Label to the third row. We want this Label to
                    take up three columns. We achieve this using the ColumnSpan property:
                </p>
                <figure>
<pre class="prettyprint"><code>    &lt;Grid BackgroundColor=&quot;Yellow&quot;
      RowSpacing=&quot;40&quot;
      ColumnSpacing=&quot;40&quot;&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 4&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;3&quot; Grid.ColumnSpan=&quot;3&quot; Text=&quot;Columnspan&quot; BackgroundColor=&quot;Silver&quot; /&gt;
&lt;/Grid&gt;  </code></pre>
                    <figcaption>Fig 03-029</figcaption>
                </figure>
                <p>You might see this type of layout in a photo gallery app where you have a bunch of thumbnails one of
                    which stands out because it is larger than the others.
                </p>
                <p>Next let's add a label to the third columns that takes three rows:</p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid BackgroundColor=&quot;Yellow&quot;
      RowSpacing=&quot;40&quot;
      ColumnSpacing=&quot;40&quot;&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 1&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;0&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 2&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;0&quot; Text=&quot;Label 3&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;1&quot; Grid.Column=&quot;1&quot; Text=&quot;Label 4&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Row=&quot;3&quot; Grid.ColumnSpan=&quot;3&quot; Text=&quot;Columnspan&quot; BackgroundColor=&quot;Silver&quot; /&gt;
    &lt;Label Grid.Column=&quot;2&quot; Grid.RowSpan=&quot;3&quot; Text=&quot;Rowspan&quot; BackgroundColor=&quot;Silver&quot; /&gt;
&lt;/Grid&gt;  </code></pre>
                    <figcaption>Fig 03-030</figcaption>
                </figure>
                <p>The result looks like this:</p>
                <figure>
                    <img src="./images/03/Fig03-031.png"/>
                    <figcaption>Fig 03-031</figcaption>
                </figure>
                <p>Now let's talk about the size of columns and rows. Currently all columns have the same width and all rows
                    have the same height. What if you want more control over the sizing of the columns and rows? Inside the
                    Grid element you can set Grid.RowDefinitions (using Property Element Syntax).
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid.RowDefinitions&gt;
&lt;/Grid.RowDefinitions&gt;</code></pre>
                    <figcaption>Fig 03-032</figcaption>
                </figure>
                <p>RowDefinitions is a collection type, it's a complex type so we cannot set it using an attribute - that's
                    why we set it using Property Element Syntax. Inside the collection we will add multiple RowDefinition
                    elements. For each row we specify a Height. The Height value can be absolute or proportional:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid.RowDefinitions&gt;
    &lt;RowDefinition Height=&quot;100&quot; /&gt;
    &lt;RowDefinition Height=&quot;2*&quot; /&gt;
    &lt;RowDefinition Height=&quot;*&quot; /&gt;
&lt;/Grid.RowDefinitions&gt;</code></pre>
                    <figcaption>Fig 03-033</figcaption>
                </figure>
                <p>The first row will be 100 units tall, and the remainder of the space will be divided between the second
                    and third rows with the second row being twice the height of the third. You can use a similar technique
                    to gain more control over the width of the columns.
                </p>
                <p>Underneath the RowDefinitions you add a complex type called ColumnDefinitions which has multiple
                    ColumnDefinition elements (depending on the number of columns) on which we set the Width property:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid.ColumnDefinitions&gt;
    &lt;ColumnDefinition Width=&quot;100&quot; /&gt;
    &lt;ColumnDefinition Width=&quot;2*&quot; /&gt;
    &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
&lt;/Grid.ColumnDefinitions&gt;</code></pre>
                    <figcaption>Fig 03-034</figcaption>
                </figure>
                <p>We set the first column to be 100 units wide and the second column to be twice the width of the the third
                    one. The result looks like this:
                </p>
                <figure>
                    <img src="./images/03/Fig03-035.png"/>
                    <figcaption>Fig 03-035</figcaption>
                </figure>
                <p>Before we move on look closely at the first column - there is some padding on the right side of the
                    Label:
                </p>
                <figure>
                    <img src="./images/03/Fig03-036.png"/>
                    <figcaption>Fig 03-036</figcaption>
                </figure>
                <p>And that's because the absolute value of 100 units that we specified is slightly too big for a short
                    label. Setting the Width of the first column to Auto:
                </p>
                <figure>
<pre class="prettyprint"><code>&lt;Grid.ColumnDefinitions&gt;
    &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
    &lt;ColumnDefinition Width=&quot;2*&quot; /&gt;
    &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
&lt;/Grid.ColumnDefinitions&gt;</code></pre>
                    <figcaption>Fig 03-037</figcaption>
                </figure>
                <p>This means the column will be wide enough to fit all it's children. Look at the result:</p>
                <figure>
                    <img src="./images/03/Fig03-038.png"/>
                    <figcaption>Fig 03-038</figcaption>
                </figure>
                <p>The padding on the right side of the label is gone but the column is still wide enough to fit all it's
                    children.
                </p>
                <p>So to recap, with Grid we can layout multiple elements in rows and columns. If you want all your rows and
                    columns to be the same size you can simply add your elements to the Grid and assign them to a row and
                    column in the Grid.
                </p>
                <p>If you want to have more control over the sizing of rows and columns you can use Property Element Syntax
                    to specify RowDefinitions and ColumnDefinitions.
                </p>
                <h3>Grid in Code</h3>
                <p>To create a Grid in code we first create a Grid object specifying Row and Column Spacing:</p>
                <figure>
<pre class="prettyprint"><code>var grid = new Grid
{
    RowSpacing = 20,
    ColumnSpacing = 40
};</code></pre>
                    <figcaption>Fig 03-039</figcaption>
                </figure>
                <p>To add elements to this Grid we use the Children property:</p>
                <figure>
                <pre><code
                        class="csharp">grid.Children.Add(new Label { Text = &quot;Label 1&quot; }, 0, 0);</code></pre>
                    <figcaption>Fig 03-040</figcaption>
                </figure>
                <p>The first argument in the Add method is View which is the base class for all visual elements like Labels,
                    Images etc. In this example we add a Label. The second argument is left which represents how far from
                    the left of the Grid this element should be - in other words what column? In this example we put it in
                    the first column. The last argument is top - how far from the top of the Grid or which row should this
                    element be in.
                </p>
                <p>Now if you want to set the RowSpan or ColumnSpan for an element you have to use the static method of the
                    Grid class. To demonstrate let's extract the Label into a separate variable, add it to the Children
                    property and finally pass it to the SetRowSpan method:
                </p>
                <figure>
                    <pre class="prettyprint"><code>Grid.SetRowSpan(label, 2);</code></pre>
                    <figcaption>Fig 03-041</figcaption>
                </figure>
                <p>We have another static method on the Grid class called SetColumnSpan:</p>
                <figure>
                    <pre class="prettyprint"><code>Grid.SetRowSpan(label, 2);</code></pre>
                    <figcaption>Fig 03-042</figcaption>
                </figure>
                <p>Again we supply our element here and then specify the number of columns we want it to take.</p>
                <p>Interestingly there a couple more methods on the Grid class - Grid.SetRow and Grid.SetColumn. Now most of
                    the time we don't use these two methods because often we specify them whilst adding the element in the
                    Children collection. Internally the Add method will call the static SetRow and SetColumn messages on the
                    Grid class.
                </p>
                <p>Also in the Xaml we use Grid.Row or Grid.Column properties to specify the row or column for an element.
                    We refer to these properties as Attached Bindable Properties because they don't belong to elements on
                    which they are defined. They are attached to the element.
                </p>
                <p>When the Xaml parser parses our file it will actually call one or more of these static methods on the
                    Grid class:
                </p>
                <figure>
<pre class="prettyprint"><code>Grid.SetRowSpan(label, 2);
Grid.SetColumnSpan(label, 2);
Grid.SetRow(label, 0);
Grid.SetColumn(label, 0);</code></pre>
                    <figcaption>Fig 03-043</figcaption>
                </figure>
                <p>Finally, if you want to work with row or column definitions you would use the following syntax:</p>
                <figure>
<pre class="prettyprint"><code>grid.RowDefinitions.Add(new RowDefinition
{
    Height = new GridLength(100, GridUnitType.Absolute)
});

grid.RowDefinitions.Add(new RowDefinition
{
    Height = new GridLength(2, GridUnitType.Star)
});

grid.RowDefinitions.Add(new RowDefinition
{
    Height = new GridLength(1, GridUnitType.Star)
});</code></pre>
                    <figcaption>Fig 03-044</figcaption>
                </figure>
                <p>The GridUnitType enumeration contains another member - Auto which means the height of this row should be
                    calculated based on it's children.
                </p>
                <p>Again from this example we can see that defining user interfaces in Xaml is a lot simpler and cleaner
                    than in code-behind. In code-behind we have to create objects, we have to write more code etc.
                </p>
                <p>However there are still times when it makes sense to use code-behind to generate user interfaces. For
                    example, imagine you want to render a Calendar. You cannot hard code the days and months of a Calendar
                    using Xaml - that would be very tedious. It would be better to use code-behind with a couple of loops to
                    dynamically generate elements and put them in a Grid.
                </p>
                <h3>Grid Exercise</h3>
                <p></p>
                <h3>Absolute Layout in XAML</h3>
                <p>There are times when you want to have more control over the positioning of certain objects on the screen.
                    For example you might want to anchor them to the edge of the screen or you may want to overlay multiple
                    objects on top of each other. For example look at this page:</p>
                <figure>
                    <img src="./images/03/Fig03-045.png"/>
                    <figcaption>Fig 03-045</figcaption>
                </figure>
                <p>We have an Aqua colour BoxView that is filling the whole page. Potentially this could be a background
                    image but for simplicity I am using a BoxView. Now on top of this BoxView we have a white BoxView which
                    could be an image, logo, title etc.</p>
                <p>In terms of position on the X Axis this BoxView is in the middle of the screen. On the Y Axis it is about
                    10% from the top of the screen. Also we have a grey button that is at the very bottom of the screen. Now
                    the interesting thing here is first of all we are overlaying elements on top of each other. Both the
                    grey
                    button and the white BoxView are on top of the Aqua BoxView. You will always get this layout with this
                    positioning irrespective of the size of the device running this app. Now if I change the orientation of
                    my device we still get the same layout:</p>
                <figure>
                    <img src="./images/03/Fig03-046.png"/>
                    <figcaption>Fig 03-046</figcaption>
                </figure>
                <p>Let's see how we can implement this design using absolute layout. Add a new ContentPage called
                    AbsolutePage. Again, in the App.cs file change the MainPage to AbsolutePage.xaml.</p>
                <p>In our Xaml file add a Padding to the ContentPage as before:</p>
                <figure>
                    <pre class="prettyprint"><code>Padding=&quot;0, 20, 0, 0&quot;</code></pre>
                    <figcaption>Fig 03-047</figcaption>
                </figure>
                <p>Next, delete the ContentPage.Content element. Start with an AbsoluteLayout element adding a
                    BackgroundColor of Yellow:</p>
                <figure>
<pre class="prettyprint"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
    &lt;ContentPage
            Padding=&quot;0, 20, 0, 0&quot;
            xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
            xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
            x:Class=&quot;UdemyXamarinForms.AbsolutePage&quot;&gt;
    &lt;AbsoluteLayout BackgroundColor=&quot;Yellow&quot;&gt;

    &lt;/AbsoluteLayout&gt;
&lt;/ContentPage&gt;</code></pre>
                    <figcaption>Fig 03-048</figcaption>
                </figure>
                <p>Now if we run the application:</p>
                <figure>
                    <img src="./images/03/Fig03-049.png"/>
                    <figcaption>Fig 03-049</figcaption>
                </figure>
                <p>We can see that similar to StackLayout and Grid our AbsoluteLayout stretches to fill it's container which
                    in this case is the Page.</p>
                <p>Now remove the BackgroundColor and add a BoxView with a Color of Aqua.</p>
                <p>Now similar to Grids we two Attached Bindable Properties that we use to set the position and size of
                    each element inside AbsoluteLayout:</p>
                <figure>
<pre class="prettyprint"><code>&lt;AbsoluteLayout&gt;
    &lt;BoxView Color=&quot;Aqua&quot;
             AbsoluteLayout.LayoutBounds=&quot;0, 0, 100, 100&quot;&gt;
    &lt;/BoxView&gt;
&lt;/AbsoluteLayout&gt;</code></pre>
                    <figcaption>Fig 03-050</figcaption>
                </figure>
                <p>LayoutBounds is a rectangle that determines the layout and size of this element. It accepts four numbers
                    that represent X, Y, Width and Height and these numbers can be absolute or proportional values (by
                    default
                    they are all absolute)</p>
                <p>If we run the application this is what we get:</p>
                <figure>
                    <img src="./images/03/Fig03-051.png"/>
                    <figcaption>Fig 03-051</figcaption>
                </figure>
                <p>What if we want the BoxView to fill the container but we don't know what the Width and Height of the
                    device running this app is? It means we cannot use absolute positioning here - that is when we use
                    proportional values. Proportional values are expressed as doubles between 0 and 1.</p>
                <p>So we can modify the LayoutBounds attached properties as follows:</p>
                <figure>
<pre class="prettyprint"><code>&lt;AbsoluteLayout&gt;
    &lt;BoxView Color=&quot;Aqua&quot;
             AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot;&gt;
    &lt;/BoxView&gt;
&lt;/AbsoluteLayout&gt;</code></pre>
                    <figcaption>Fig 03-052</figcaption>
                </figure>
                <p>Now we need to indicate to the Xamarin forms that these are proportional values because as I said by
                    default all these numbers are absolute values. We do this by using the other Attached Bindable Property
                    - LayoutFlags. LayoutFlags is an enumeration with these members:</p>
                <ul>
                    <li>None (default)</li>
                    <li>All</li>
                    <li>WidthProportional</li>
                    <li>HeightProportional</li>
                    <li>XProportional</li>
                    <li>YProportional</li>
                    <li>PositionProportional</li>
                    <li>SizeProportional</li>
                </ul>
                <p>So in the LayoutBounds property I want all the numbers to be proportional so I set LayoutFlags to
                    all:</p>
                <figure>
            <pre class="prettyprint"><code>&lt;AbsoluteLayout&gt;
        &lt;BoxView Color=&quot;Aqua&quot;
                 AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot; AbsoluteLayout.LayoutFlags=&quot;All&quot;&gt;
        &lt;/BoxView&gt;
    &lt;/AbsoluteLayout&gt;</code></pre>
                    <figcaption>Fig 03-053</figcaption>
                </figure>
                <p>Now if we run the application this is what we get:</p>
                <figure>
                    <img src="./images/03/Fig03-054.png"/>
                    <figcaption>Fig 03-054</figcaption>
                </figure>
                <p>Now let's put the white BoxView on top of this Aqua BoxView:</p>
                <figure>
<pre class="prettyprint"><code>&lt;AbsoluteLayout&gt;
        &lt;BoxView Color=&quot;Aqua&quot;
                 AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot; AbsoluteLayout.LayoutFlags=&quot;All&quot;&gt;
        &lt;/BoxView&gt;
        &lt;BoxView Color=&quot;White&quot;
                 AbsoluteLayout.LayoutBounds=&quot;0.5, 0.1, 100, 100&quot; AbsoluteLayout.LayoutFlags=&quot;PositionProportional&quot;/&gt;
    &lt;/AbsoluteLayout&gt;</code></pre>
                    <figcaption>Fig 03-055</figcaption>
                </figure>
                <p>This BoxView is in the middle of the X Axis and on the Y Axis is about 10% from the top of the page. To
                    achieve this we used proportional values for the position. However for the size we used absolute values.
                    This is why in the LayoutFlags we specify that only the position is proportional.</p>
                <p>Let's preview the result:</p>
                <figure>
                    <img src="./images/03/Fig03-056.png"/>
                    <figcaption>Fig 03-056</figcaption>
                </figure>
                <p>So our new BoxView is 100x100 units and the Y Axis its about 10% from the top of the page and on the X
                    Axis it's right in the middle. Finally let's add a Button on the bottom of the screen:</p>
                <figure>
            <pre class="prettyprint"><code>&lt;AbsoluteLayout&gt;
    &lt;BoxView Color=&quot;Aqua&quot;
             AbsoluteLayout.LayoutBounds=&quot;0, 0, 1, 1&quot; AbsoluteLayout.LayoutFlags=&quot;All&quot;&gt;
    &lt;/BoxView&gt;
    &lt;BoxView Color=&quot;White&quot;
             AbsoluteLayout.LayoutBounds=&quot;0.5, 0.1, 100, 100&quot; AbsoluteLayout.LayoutFlags=&quot;PositionProportional&quot;/&gt;
    &lt;Button Text=&quot;Get Started&quot; BackgroundColor=&quot;Silver&quot; TextColor=&quot;White&quot;
            AbsoluteLayout.LayoutBounds=&quot;0, 1, 1, 50&quot;
            AbsoluteLayout.LayoutFlags=&quot;PositionProportional, WidthProportional&quot;/&gt;
&lt;/AbsoluteLayout&gt;</code></pre>
                    <figcaption>Fig 03-057</figcaption>
                </figure>
                <p>For the position of the Button again we use proportional values. So for X we use 0 and for Y we use 1.
                    So this element will be positioned right at the bottom of the screen. For the width, again we will use a
                    proportional value of 1 because we want the Button to stretch to fill the entire page on the X Axis. For
                    the
                    height however we will use an absolute value of 50. </p>
                <p>In the case of the Button the first three numbers specified in the LayoutBounds Bindable Attached
                    Properties (X, Y and Width) are proportional values but the Height is an absolute value. To describe
                    this in the LayoutFlags Bindable Attached Property we combine two flags: PositionProportional and
                    WidthProportional.</p>
                <p>Let's run the application:</p>
                <figure>
                    <img src="./images/03/Fig03-058.png"/>
                    <figcaption>Fig 03-058</figcaption>
                </figure>
                <p>So absolute layout is useful when you want to have more control over position and size of elements on
                    screen - especially when you want to anchor them to the edges of the screen or when you want to overlay
                    multiple elements on top of each other.</p>
                <h3>Absolute Layout in Code</h3>
                <p>To use absolute layout in code firstly comment out the AbsoluteLayout in XAML. Add the following code to
                    the code-behind file, in the constructor after the call to InitializeComponent():</p>
                <figure>
<pre class="prettyprint"><code>var layout = new AbsoluteLayout();
Content = layout;

var aquaBox = new BoxView { Color = Color.Aqua };
layout.Children.Add(
    aquaBox,
    new Rectangle(0, 0, 1 ,1),
    AbsoluteLayoutFlags.All);

// Not like the video which results in blank page!
AbsoluteLayout.SetLayoutBounds(aquaBox, new Rectangle(0, 0, .5, 1));
AbsoluteLayout.SetLayoutFlags(aquaBox, AbsoluteLayoutFlags.All);</code></pre>
                    <figcaption>Fig 03-059</figcaption>
                </figure>
                <p>Don't forget to set the Content of this page to the layout you created.</p>
                <p>First of all we create a BoxView called aquaBox, then we add that BoxView to our Children collection.
                    The Add method has a few different overloads, the one we are going to use is shown here:</p>
                <figure>
                    <img src="./images/03/Fig03-060.png"/>
                    <figcaption>Fig 03-060</figcaption>
                </figure>
                <p>It takes a View (which means an element), and a Rectangle(X, Y, Width, Height) for specifying the
                    position and size, and
                    finally a flag to determine which values are proportional. So we specify a Rectangle and use the same
                    values as in the previous lecture: 0, 0, 1, 1. All these values are proportional so as the third
                    argument
                    we use AbsoluteLayoutFlags.All</p>
                <p>Now similar to what we learned about using Grids in code this Add method internally calls one or more
                    Static methods on the AbsoluteLayout class.</p>
                <p>So we have AbsoluteLayout.SetLayoutBounds which takes an element like aquaBox and a Rectangle. This
                    method is useful if you want to change the size of an element later on - after initialization.</p>
                <p>We also have another static method - AbsoluteLayout.SetLayoutFlags(). So if you want to change any of the
                    flags; again we pass our element and then the second argument is the flag we want to use (we will keep
                    it set to All although you could change it here).</p>

                <p><strong>Note</strong> - the code in the video results in a blank page when run with the SetLayoutBounds
                    and SetLayoutFlags properties set as shown in the video - that's why I changed the values in the code
                    example above.</p>
                <p></p>
                <h3>Absolute Layout Exercise</h3>
                <p></p>
                <h3>Relative Layout in XAML</h3>
                <p>The final Layout we have in XamarinForms is RelativeLayout. In a manner similar to AbsoluteLayout with
                    RelativeLayout we can overlay elements over the top of each other. However RelativeLayout is more powerful
                    than AbsoluteLayout because you can apply constraints to the position or size of an element relative to
                    another element. This gives us more control over the position and size of elements. Here is an example:</p>
                <figure>
                    <img src="./images/03/Fig03-061.png"/>
                    <figcaption>Fig 03-061</figcaption>
                </figure>
                <p>Again we have an Aqua BoxView which is occupying about a third of the page. We have another BoxView
                    which is always 20 units below the Aqua BoxView. We cannot do this with AbsoluteLayout because here we are
                    constraining the position of the Silver BoxView based on the Aqua BoxView - so it is always 20 units
                    below the Aqua BoxView.
                </p>
                <p>A real world example of this is a users profile in a Social Networking app. Each profile has what we call
                    a banner or background image on the top and then somewhere around here:</p>
                <figure>
                    <img src="./images/03/Fig03-062.png"/>
                    <figcaption>Fig 03-062</figcaption>
                </figure>
                <p>we have the users photo. We wont implement the user photo in this lecture for simplicity - it will be
                    a task for you to complete in a later exercise.</p>
                <p>So let's see how we can use RelativeLayout to build a user interface like this. Add a new Content Page
                    called RelativePage, remove the ContentPage.Content element and add some padding to the ContentPage element.
                    Also in the App.cs file set this new page as the MainPage in the application:
                </p>
                <figure>
            <pre class="prettyprint"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;ContentPage
        Padding=&quot;0, 20, 0, 0&quot;
        xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot;
        xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot;
        x:Class=&quot;UdemyXamarinForms.RelativePage&quot;&gt;

&lt;/ContentPage&gt;</code></pre>
                    <figcaption>Fig 03-063</figcaption>
                </figure>
                <p>Add a RelativeLayout element with the following Xaml:</p>
                <figure>
            <pre class="prettyprint"><code>&lt;RelativeLayout&gt;
    &lt;BoxView Color=&quot;Aqua&quot; x:Name=&quot;banner&quot;
             RelativeLayout.WidthConstraint=&quot;{ConstraintExpression
            Type=RelativeToParent,
            Property=Width,
            Factor=1}&quot;

             RelativeLayout.HeightConstraint=&quot;{ConstraintExpression
            Type=RelativeToParent,
            Property=Height,
            Factor=0.3}&quot;/&gt;

    &lt;BoxView Color=&quot;Silver&quot;
             RelativeLayout.YConstraint=&quot;{ConstraintExpression
            Type=RelativeToView,
            ElementName=banner,
            Property=Height,
            Factor=1,
            Constant=20}&quot;/&gt;
&lt;/RelativeLayout&gt;</code></pre>
                    <figcaption>Fig 03-064</figcaption>
                </figure>
                <p>Inside the RelativeLayout we add a BoxView and set the Color to Aqua. We
                    want the BoxView to occupy about a third of the page - for this we can use one or more Attached Bindable
                    Properties:</p>
                <ul>
                    <li>XConstraint</li>
                    <li>YConstraint</li>
                    <li>WidthConstraint</li>
                    <li>HeightConstraint</li>
                    <li>BoundsConstraint</li>
                </ul>
                <p>We will start with the WidthConstraint. We want the width of this aqua BoxView to be exactly the same width as it's container which, in this
                    case, is the RelativeLayout element. By the way, as with other Layouts, Relative layout automatically
                    stretches to fill the entire page.</p>
                <p>As the value of WidthConstraint we use a constraint expression which is a XAML markup extension (the other
                    markup extension we used previously was Binding). XAML markup extensions are always between curly braces.
                    Here we need to set a few properties. Firstly Type which can have two values:</p>
                <ul>
                    <li>RelativeToParent</li>
                    <li>RelativeToView</li>
                </ul>
                <p>For the Aqua BoxView we will use RelativeToParent. The property that we want the ConstraintExpression to
                    use from the Parent is Width. Next we apply a Factor of 1 which basically means - the width of this
                    Aqua BoxView will be the Width of its parent multiplied by 1.
                </p>
                <p>Next we want the Aqua BoxView to be about a third of the height of it's parent. So we use the
                    RelativeLayout again but this time with the HeightConstraint. In the Constraint expression we specify a
                    Type of RelativeToParent again, the Property we are interested in this time is Height and for the Factor we
                    specify 0.3. This means the height of this Aqua BoxView will be the height of it's parent multiplied by 0.3.
                </p>
                <p>Let's look at the result:</p>
                <figure>
                    <img src="./images/03/Fig03-065.png"/>
                    <figcaption>Fig 03-065</figcaption>
                </figure>
                <p>There is nothing particularly special about this layout. We could build the exact same thing using
                    absolute layout. So let me show you where RelativeLayout gets powerful. Let's say we want to put a Silver
                    BoxView 20 units below this Aqua BoxView. After specifying the BoxView element and a Color of Silver add
                    an attached bindable property RelativeLayout.YConstraint. This time for the ConstraintExpression we specify
                    a Type of RelativeToView because this time I want to apply the YConstraint based on the Aqua BoxView. This
                    is something we cannot achieve with absolute layout - we cannot set the position or size of an element based
                    on another element. We need to identify which View we are referring to. We do this by giving the Aqua BoxView
                    a name (banner). Back in the Silver BoxView we will use another property called ElementName which we set
                    to banner. Next we specify the property of the banner we are interested in - in this case it's Height - we
                    want to get the Height and add 20 units to it to set the Y coordinate of the Silver BoxView. Next we set the
                    Factor to 1. Finally we set the Constant property to 20 units. This means the Y coordinate of the Silver
                    BoxView will be the height of the Banner times 1 plus 20. The Constant property can also be set to a
                    negative value</p>
                <p>Now let's look at the result:</p>
                <figure>
                    <img src="./images/03/Fig03-066.png"/>
                    <figcaption>Fig 03-066</figcaption>
                </figure>
                <p>So you see our Silver BoxView is 20 units below the Aqua BoxView. So with RelativeLayout we can set the
                    position or size of an element based on another element. This is something we cannot achieve using
                    AbsoluteLayout</p>
                <h3>Relative Layout in Code</h3>
                <p>Firstly, comment out the XAML for the RelativeLayout in the RelativePage.xaml file. Next, in the
                    code-behind after the call to InitializeComponent() in the constructor add the following code:</p>
                <figure>
            <pre class="prettyprint"><code>var layout = new RelativeLayout();
Content = layout;

var aquaBox = new BoxView { Color = Color.Aqua };
layout.Children.Add(aquaBox,
    widthConstraint: Constraint.RelativeToParent(parent =&gt; parent.Width),
    heightConstraint: Constraint.RelativeToParent(parent =&gt; parent.Height * 0.3));

var silverBox = new BoxView { Color = Color.Silver };
layout.Children.Add(silverBox,
     yConstraint: Constraint.RelativeToView(aquaBox, (RelativeLayout, element) =&gt; element.Height + 20));</code></pre>
                    <figcaption>Fig 03-067</figcaption>
                </figure>
                <p>First we create a layout of type RelativeLayout and set the Content of this page to the layout:</p>
                <figure>
            <pre class="prettyprint"><code>var layout = new RelativeLayout();
Content = layout;</code></pre>
                    <figcaption>Fig 03-068</figcaption>
                </figure>
                <p>Next we add a new BoxView called aquaBox with a Color of Aqua:</p>
                <figure>
                    <pre class="prettyprint"><code>var aquaBox = new BoxView { Color = Color.Aqua };</code></pre>
                    <figcaption>Fig 03-069</figcaption>
                </figure>
                <p>Next add the aquaBox BoxView to our layout:</p>
                <figure>
<pre class="prettyprint"><code>layout.Children.Add(aquaBox,
    widthConstraint: Constraint.RelativeToParent(parent =&gt; parent.Width),
    heightConstraint: Constraint.RelativeToParent(parent =&gt; parent.Height * 0.3));</code></pre>
                    <figcaption>Fig 03-070</figcaption>
                </figure>
                <p>The Add method has several overloads. The one that we use most often has five parameters with the last
                    four being optional because they are set to null by default. We have used the widthConstraint and
                    heightConstraint optional parameters. To keep our code clean we can use named arguments in C#. We need
                    to supply a Constraint object. We use the Constraint class which has a few factory methods for creating
                    a Constraint object:</p>
                <ul>
                    <li>FromExpression</li>
                    <li>RelativeToParent</li>
                    <li>RelativeToView</li>
                </ul>
                <p>The one we use here is RelativeToParent. The metadata for this method indicates this method gets a
                    Func or RelativeLayout and double (basically whenever you see Func you can use a lambda expression):</p>
                <figure>
                    <img src="./images/03/Fig03-071.png"/>
                    <figcaption>Fig 03-071</figcaption>
                </figure>
                <p>The lambda expression takes an object which is a RelativeLayout and returns a double. I am going to
                    call this parameter parent:</p>
                <figure>
                    <pre class="prettyprint"><code>parent =&gt;</code></pre>
                    <figcaption>Fig 03-072</figcaption>
                </figure>
                <p>I want the width of the aquaBox BoxView to be the same as it's parent:</p>
                <figure>
                    <pre class="prettyprint"><code>parent.Width</code></pre>
                    <figcaption>Fig 03-073</figcaption>
                </figure>
                <p>Now let's apply the heightConstraint:</p>
                <figure>
                    <pre class="prettyprint"><code>heightConstraint: Constraint.RelativeToParent(parent =&gt; parent.Height * 0.3));</code></pre>
                    <figcaption>Fig 03-074</figcaption>
                </figure>
                <p>This lambda expression takes a parent and returns the height of the parent multiplied by 0.3:</p>
                <figure>
                    <pre class="prettyprint"><code>parent =&gt; parent.Height * 0.3)</code></pre>
                    <figcaption>Fig 03-075</figcaption>
                </figure>
                <p>Finally, let's add our Silver BoxView:</p>
                <figure>
                    <pre class="prettyprint"><code>var silverBox = new BoxView { Color = Color.Silver };</code></pre>
                    <figcaption>Fig 03-076</figcaption>
                </figure>
                <p>Next add the silverBox BoxView to our layout:</p>
                <figure>
                    <pre class="prettyprint"><code>layout.Children.Add(silverBox,</code></pre>
                    <figcaption>Fig 03-077</figcaption>
                </figure>
                <p>This time we apply a yConstraint:</p>
                <figure>
                    <pre class="prettyprint"><code>yConstraint: Constraint.RelativeToView(aquaBox, (RelativeLayout, element) =&gt; element.Height + 20));</code></pre>
                    <figcaption>Fig 03-078</figcaption>
                </figure>
                <p>This time round we use RelativeToView and supply aquaBox as the View/Element to use. If we look at the
                    intellisense:</p>
                <figure>
                    <img src="./images/03/Fig03-079.png"/>
                    <figcaption>Fig 03-079</figcaption>
                </figure>
                <p>Again you can see Func which means we are expected to write an inline function which takes two arguments
                    - a RelativeLayout and a View and then returns a double.</p>
                <p>So again we supply a lambda expression with two arguments - the first is RelativeLayout and the second one
                    is the target View (in this case the aquaBox BoxView) which will call element:</p>
                <figure>
                    <pre class="prettyprint"><code>(RelativeLayout, element)</code></pre>
                    <figcaption>Fig 03-080</figcaption>
                </figure>
                <p>This goes to element.Height + 20:</p>
                <figure>
                    <pre class="prettyprint"><code>(RelativeLayout, element) =&gt; element.Height + 20</code></pre>
                    <figcaption>Fig 03-081</figcaption>
                </figure>
                <p>If you run the application you should see Layout identical to the one we achieved using Xaml.</p>
                <h3>Relative Layout Exercise</h3>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "XamarinFormsCrossPlatform03Layouts"
    }
</script>

<style scoped>

</style>