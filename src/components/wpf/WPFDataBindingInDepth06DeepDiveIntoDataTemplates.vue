<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Deep Dive into DataTemplates</h2>
        </div>
        <div class="panel-body">
          <h3>Introduction</h3>
          <p>Hi, this is Brian Noyes, and in this module we're going to dive into Data Templates. Data Templates are a
            very powerful mechanism of WPF data binding that allows you to provide the visual structure for some
            data-bound object and have that mapped up at runtime as the objects get rendered out. So we'll look at how
            DataTemplates work and what the variations on DataTemplates are and how to use them.
          </p>
          <p>First we'll talk about the broad concepts of DataTemplates and how they work in general, and how they get
            mapped out to the data objects that are being rendered out to provide the visual structure for rendering on
            the screen.
          </p>
          <p>Next we'll talk about ExplicitDataTemplates, which are the most direct and simple way to use DataTemplates.
            As the name implies, it involves a direct hookup between the data-bound control and the template that should
            be used for a given collection or data object.
          </p>
          <p>Next we'll talk about ImplicitDataTemplates, which are a little more magical in the way that they work, but
            it involves an automatic selection of the appropriate DataTemplate based on the type of the data object
            that's going to be rendered, and this gives us an awful lot of power for handling heterogeneous collections
            of derived types of some data object type, and it becomes vitally important in Model-View-ViewModel
            scenarios, which we'll use in the demos to render out different Views for different ViewModel types.
          </p>
          <p>Next, we'll talk about DataTemplateSelectors, which give you a little more explicit control, but still
            dynamic control to switch which DataTemplate you use based on whatever logic you need to invoke to make that
            selection.
          </p>
          <p>
            And finally, we'll finish off this module with HierarchicalDataTemplates, which are just a specialized form
            of DataTemplate that work in hierarchical data model scenarios such as presenting data in TreeView control.
          </p>
        </div>
        <div class="panel-body">
          <h3>DataTemplates Overview</h3>
          <p>The way DataTemplates work, in general, is that you are going to have some data-bound control:</p>
          <figure>
            <pre class="prettyprint">&lt;ContentControl Grid.Row=&quot;1&quot; Content=&quot;{Binding CurrentViewModel}&quot;/&gt;</pre>
            <figcaption>Fig 05-001</figcaption>
          </figure>
          <p>And it's either going to be a ContentControl or some control derived from ItemsControl in general, such as
            ListBox, ComboBox or DataGrid.
          </p>
          <p>Let's start with the ContentControl case. ContentControl, if you're not familiar, has a single Content
            property that can be set to a UI element and it will render that UI element in the child area, so the child
            area is really a blank canvas in which the content can be rendered.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-002.png" class="image"/>
            <figcaption>Fig 05-002</figcaption>
          </figure>
          <p>In this case, though, we're supplying the content as a data-bound object. It happens to be a ViewModel in
            this case, and this is where DataTemplates come in, is that a DataTemplate can provide the visual structure
            for how to render that data object into that child content area.
          </p>
          <p>So we then supply a DataTemplate, and the DataTemplate has some structure to it. In this case we've just
            got a child user control as the structure of that DataTemplate as the nested element:
          </p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate DataType=&quot;{x:Type local:HierarchicalDataTemplatesViewModel}&quot;&gt;
    &lt;local:HierarchicalDataTemplatesView /&gt;
&lt;/DataTemplate&gt;</pre>
            <figcaption>Fig 05-003</figcaption>
          </figure>
          <p>And when these come together in the data binding context, that DataTemplate provides the visual structure
            for the data-bound object that is the content.
          </p>
          <p>Now a really important part of DataTemplates to understand is that when a DataTemplate gets rendered, the
            DataContext property of the root element in that DataTemplate, in this case, the HierarchalDataTemplates
            view, it's DataContext will be set to the instance of the data-bound object that is being rendered:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-004.png" class="image"/>
            <figcaption>Fig 05-004</figcaption>
          </figure>
          <p>So in this case, the CurrentViewModel object will be set as the DataContext for that
            HierarchalDataTemplatesView.
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot; ItemsSource=&quot;{Binding Products}&quot;
         ItemTemplate=&quot;{StaticResource ProductTemplate}&quot;&gt;
&lt;/ListBox&gt;</pre>
            <figcaption>Fig 05-005</figcaption>
          </figure>
          <p>Now in the case of an ItemsControl, such as a ListBox, ComboBox or DataGrid, first off you're going to be
            binding to a collection of data objects and the idea is you want to have a visual representation for each
            one of those collection objects, so you provide a DataTemplate and hook it in either implicitly or
            explicitly, as we'll cover in this module, and that DataTemplate provides that visual structure for how do I
            render a single Product object in this case:
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot; ItemsSource=&quot;{Binding Products}&quot;
         ItemTemplate=&quot;{StaticResource ProductTemplate}&quot;&gt;
&lt;/ListBox&gt;</pre>
            <figcaption>Fig 05-006</figcaption>
          </figure>
          <p>So here we have a grid with an image and a couple of rows in it to provide the name and description for
            that product.
          </p>
          <p>So that DataTemplate basically lays down what is the visual structure for that data object:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-007.png" class="image"/>
            <figcaption>Fig 05-007</figcaption>
          </figure>
          <p>Within the DataTemplate we have individual bindings and you can see that they're just binding with simple
            paths to properties on a single Product object.
          </p>
          <p>This works because, again, whenever a DataTemplate is rendered, the DataContext of the root element is set
            to the data object it's being rendered for, in this case, a Product object. So that DataContext flows down
            the visual tree of this DataTemplate, making that DataContext available to those child bindings.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-008.png" class="image"/>
            <figcaption>Fig 05-008</figcaption>
          </figure>
          <p>And then in the case of an ItemsControl, this all comes together in that the ListBox, in this case, will
            render out a single instance of that DataTemplate for each product object in the collection it's bound to,
            setting the DataContext of that single instance to that product object:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-009.png" class="image"/>
            <figcaption>Fig 05-009</figcaption>
          </figure>
          <p>And that's basically how DataTemplates work at a high level. So now let's look at the different ways to get
            them hooked up and the different variants of DataTemplates.
          </p>
        </div>
        <div class="panel-body">
          <h3>Explicit DataTemplates</h3>
          <p>So first let's look at ExplicitDataTemplates because they're the most straightforward in terms of the way
            the DataTemplate gets hooked up to the data-bound control.
          </p>
          <p>First off, you're going to define a DataTemplate somewhere, and usually that's going to be in a Resource
            dictionary, and again, you define that DataTemplate with some visual structure for some data object that you
            want to render out:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl&gt;
    &lt;UserControl.Resources&gt;
        &lt;DataTemplate x:Key=&quot;ProductTemplate&quot;&gt;
            &lt;Grid&gt;...&lt;/Grid&gt;
        &lt;/DataTemplate&gt;
    &lt;/UserControl.Resources&gt;
    &lt;Grid&gt;
        &lt;ListBox ItemTemplate=&quot;{StaticResource ProductTemplate}&quot;
                 ItemsSource=&quot;{Binding Products}&quot; /&gt;
    &lt;/Grid&gt;
&lt;/UserControl&gt;</pre>
            <figcaption>Fig 05-010</figcaption>
          </figure>
          <p>You're going to give that DataTemplate a key if it lives in the Resource dictionary, so that you can then
            refer to it by pointing to it with a StaticResource or DynamicResource markup extension from the appropriate
            property of the data-bound control.
          </p>
          <p>The property we're talking about here is either going to be the ContentTemplate property of a
            ContentControl or the ItemTemplate of an ItemsControl, such as a ListBox. That tells that control to use
            that specific DataTemplate when it's rendering out the data-bound objects that it's pointed to.
          </p>
          <p>Then at runtime it's going to be used to render out those data-bound objects and provide the visual
            representation of those objects, and again, the DataTemplate can contain bindings to the properties of that
            data-bound object. So let's take a look at a demo of using ExplicitDataTemplates to render out some data.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Explicit DataTemplates</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-001" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\before\DataTemplates - Start\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-001"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-002" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\after\DataTemplates\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-002"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo, I want to show you how you can use ExplicitDataTemplates to provide the visual structure for
            a data-bound object that's being rendered in a control.
          </p>
          <p>Our starting point for this demo, and the rest of the demos in this module is this DataTemplates project,
            which is just a stock WPF project with a couple things added at this point. We've got this Images subfolder
            that has some product images that we'll use for rendering purposes:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-011.png" class="image"/>
            <figcaption>Fig 05-011</figcaption>
          </figure>
          <p>And we've got a RelayCommand, which we've seen in previous modules for hooking up Command scenarios. We've
            also got our ZzaData data layer that brings in data via Entity Framework from a Zza database.
          </p>
          <p>Now in this demo, I'm going to go ahead and use the Model-View-ViewModel, or MVVM pattern, in a very
            simplistic form. You don't have to get too wrapped up in that, I'm using it as just another example of data
            binding and also because in MVVM DataTemplates become fairly important.
          </p>
          <p>So the first thing I'm going to do is add a View in ViewModel. The View will be called
            ExplicitDataTemplatesView and it will be a User Control.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-012.png" class="image"/>
            <figcaption>Fig 05-012</figcaption>
          </figure>
          <p>And then I'll add a class called ExplicitDataTemplatesViewModel. I'm going to replace this class with a
            fleshed-out definition and just explain the code here quickly.
          </p>
          <figure>
                <pre class="prettyprint">public class ExplicitDataTemplatesViewModel : INotifyPropertyChanged
{
    private ObservableCollection&lt;Product&gt; _Products;

    public ExplicitDataTemplatesViewModel()
    {
        if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
        {
            ZzaDbContext context = new ZzaDbContext();
            Products = new ObservableCollection&lt;Product&gt;(context.Products.ToList());
            Products.ToList().ForEach(p =&gt; p.Image = &quot;Images/&quot; + p.Image);
        }
    }
    public ObservableCollection&lt;Product&gt; Products
    {
        get
        {
            return _Products;
        }
        set
        {
            if (value != _Products)
            {
                _Products = value;
                PropertyChanged(this, new PropertyChangedEventArgs(&quot;Products&quot;));
            }
        }
    }</pre>
            <figcaption>Fig 05-013</figcaption>
          </figure>
          <p>Okay, so the fleshed out definition here is a class that implements INotifyPropertyChanged, so that it can
            participate nicely in data binding.
          </p>
          <p>It exposes one property called Products, which is an observable collection of products suitable for data
            binding, again:
          </p>
          <figure>
                <pre class="prettyprint">public ObservableCollection&lt;Product&gt; Products
{
    get
    {
        return _Products;
    }
    set
    {
        if (value != _Products)
        {
            _Products = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;Products&quot;));
        }
    }
}</pre>
            <figcaption>Fig 05-014</figcaption>
          </figure>
          <p>And then it has a Constructor that only when you're not in the DesignTime environment, and you can do that
            by checking this Designer properties GetIsInDesignMode property.
          </p>
          <figure>
            <pre
              class="prettyprint">if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))</pre>
            <figcaption>Fig 05-015</figcaption>
          </figure>
          <p>If it's true, then you're in the designer, if it's false you're not. So only if we're not in the Designer,
            do we go out to the database and populate our products by going to the Products collection of our Zza
            DBContext.
          </p>
          <figure>
                <pre class="prettyprint">if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
{
    ZzaDbContext context = new ZzaDbContext();
    Products = new ObservableCollection&lt;Product&gt;(context.Products.ToList());
    Products.ToList().ForEach(p =&gt; p.Image = &quot;Images/&quot; + p.Image);
}</pre>
            <figcaption>Fig 05-016</figcaption>
          </figure>
          <p>And then we're looping over each product after we get it, and modifying the Image property to have this
            relative path down into the Images folder that's part of our project.
          </p>
          <p>Now we need a View that's going to data bind to this, and whenever you do the MVVM pattern, the ViewModel
            is going to be set as the DataContext for the View. So the View elements can just bind to the exposed
            properties of that ViewModel.
          </p>
          <p>So let's go into our View and add a local namespace so that we can get to the other objects defined in our
            project
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl x:Class=&quot;DataTemplates.ExplicitDataTemplatesView&quot;
             xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
             xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
             xmlns:mc=&quot;http://schemas.openxmlformats.org/markup-compatibility/2006&quot;
             xmlns:d=&quot;http://schemas.microsoft.com/expression/blend/2008&quot;
             xmlns:local=&quot;clr-namespace:DataTemplates&quot;
             mc:Ignorable=&quot;d&quot;
             d:DesignHeight=&quot;300&quot; d:DesignWidth=&quot;300&quot;&gt;</pre>
            <figcaption>Fig 05-017</figcaption>
          </figure>
          <p>and then we're going to set the DataContext of this View declaratively by setting the DataContext property
            to an instance of our new ViewModel
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.DataContext&gt;
    &lt;local:ExplicitDataTemplatesViewModel /&gt;
&lt;/UserControl.DataContext&gt;</pre>
            <figcaption>Fig 05-018</figcaption>
          </figure>
          <p>Now we can add elements to this View that bind to the exposed properties of that ViewModel.</p>
          <p>So I'm going to add a ListBox that's bound to our Products collection. So I'll drop down here in the Grid
            and add that ListBox, and we can see we just set Binding to Products:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ListBox x:Name=&quot;ProductsListBox&quot;
             ItemsSource=&quot;{Binding Products&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-019</figcaption>
          </figure>
          <p>and because there is a Products property that exposes a collection on our ViewModel, we should be good to
            go here. Now to actually see this View, we're going to have to put it into our MainWindow. So I'm going to
            drop over to my MainWindow, build to make sure that Visual Studio knows about those, and open up my Toolbox.
            And up here at the top you can see that our ExplicitDataTemplateView shows up:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-020.png" class="image"/>
            <figcaption>Fig 05-020</figcaption>
          </figure>
          <p>I can drag and drop that into the Grid of the MainWindow. If I go ahead and run at this point, we can see
            that I do, in fact, get products rendered out:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-021.png" class="image"/>
            <figcaption>Fig 05-021</figcaption>
          </figure>
          <p>but I'm just getting a ToString on the Product object, not very functional. So the simplest thing we could
            do is drop here to our ListBox and add the DisplayMemberPath property pointing to the Name property of each
            of the products.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ListBox x:Name=&quot;ProductsListBox&quot;
        ItemsSource=&quot;{Binding Products}&quot;
        DisplayMemberPath=&quot;Name&quot;&gt;
    &lt;/ListBox&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-022</figcaption>
          </figure>
          <p>If we run with that we get a slightly more functional ListBox where we see the Product name, but it's not
            very pretty to look at. This is WPF and we can put a little more visual flare on presenting a Product, and
            that's where DataTemplates come in.
          </p>
          <p>Now normally when you define DataTemplates, you're going to want to make them reusable. That means you're
            going to put them into a Resource dictionary. So I'm going to go into the UserControl.Resources here and
            declare myself a DataTemplate called ProductTemplate:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;DataTemplate x:Key=&quot;ProductTemplate&quot;&gt;

    &lt;/DataTemplate&gt;
&lt;/UserControl.Resources&gt;</pre>
            <figcaption>Fig 05-023</figcaption>
          </figure>
          <p>A DataTemplate is just an element that you can create inside of a Resource dictionary and it has some
            content to it. The content of the DataTemplate is the visual structure that's going to be rendered out when
            that DataTemplate is used. So we want some visual structure to render out a product here.
          </p>
          <p>I'm going to drop into my DataTemplate and add some XAML:</p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;Grid.ColumnDefinitions&gt;
        &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
        &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
    &lt;/Grid.ColumnDefinitions&gt;
    &lt;Image x:Name=&quot;ProductImage&quot;
           Source=&quot;{Binding Image}&quot;
           Margin=&quot;5&quot;
           Width=&quot;100&quot; /&gt;
    &lt;Grid Grid.Column=&quot;1&quot;&gt;
        &lt;Grid.RowDefinitions&gt;
            &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
            &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
        &lt;/Grid.RowDefinitions&gt;
        &lt;TextBlock Text=&quot;{Binding Name}&quot;
                   FontFamily=&quot;Arial&quot;
                   FontSize=&quot;14&quot;
                   FontWeight=&quot;Bold&quot; /&gt;
        &lt;TextBlock Grid.Row=&quot;1&quot;
                   Text=&quot;{Binding Description}&quot;
                   TextWrapping=&quot;Wrap&quot;
                   Width=&quot;300&quot; /&gt;
    &lt;/Grid&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-024</figcaption>
          </figure>
          <p>And we can see what I've added here is a root Grid that has two columns. In the first column is an Image
            control that's going to render out our Image property of an individual Product. Then there's a nested Grid
            that has two rows. The first row is going to show the Name of the Product and the second row is going to
            show the Description of the Product. Notice that each of these bindings is assuming that the DataContext is
            going to be set to an individual Product, and that's an important part of how DataTemplates work.
          </p>
          <p>An instance of this DataTemplate and its contents is going to be rendered out for each data-bound object in
            a bound context. So in the case of a ListBox, we're going to have a collection of Products. For each Product
            in that collection, it's going to render out an instance of the contents of this DataTemplate.
          </p>
          <p>And as part of that process, conceptually, it is setting the DataContext property to that Product object
            that is being rendered:
          </p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate x:Key=&quot;ProductTemplate&quot; &gt;
    &lt;Grid DataContext=&quot;Product&quot;&gt;
        &lt;Grid.ColumnDefinitions&gt;
            &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
            &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
        &lt;/Grid.ColumnDefinitions&gt;</pre>
            <figcaption>Fig 05-025</figcaption>
          </figure>
          <p>Now you don't explicitly put that there, that's going to happen automatically for you when the DataTemplate
            is rendered, but the root elements DataContext is going to be set to the data- bound object, and that means
            that DataContext will flow down and nested bindings within that template can just use a Path property off of
            that DataContext object.
          </p>
          <p>Now that we have our template defined, we need to tie it into our ListBox, so we're going to get rid of the
            DisplayMemberPath and instead use a property called ItemTemplate.
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot;
     ItemsSource=&quot;{Binding Products}&quot;
     ItemTemplate=&quot;{StaticResource ProductTemplate} &quot; /&gt;</pre>
            <figcaption>Fig 05-026</figcaption>
          </figure>
          <p>We're going to point to our template through a StaticResource to the ProductTemplate.</p>
          <p>And with that in place, we can go ahead and run:</p>

          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-027.png" class="image"/>
            <figcaption>Fig 05-027</figcaption>
          </figure>
          <p>and now we see a much more visually-appealing presentation of our products in the ListBox.</p>
          <p>And we can put whatever structure we want into this DataTemplate to render out the data that is associated
            with whatever visual elements we want to present them.
          </p>
          <p>Now we could make some further modifications to our DataTemplate. If I go to this nested grid and set a
            Height property, I can actually use other forms of bindings that we've talked about with ElementName and
            RelativeSource bindings, for example, to point to other elements within our DataTemplate:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Image x:Name=&quot;ProductImage&quot;
   Source=&quot;{Binding Image}&quot;
   Margin=&quot;5&quot;
   Width=&quot;100&quot; /&gt;
&lt;Grid Grid.Column=&quot;1&quot;
   Height=&quot;{Binding ElementName=ProductImage, Path=Height}&quot;&gt;
&lt;Grid.RowDefinitions&gt;
   &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
   &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
&lt;/Grid.RowDefinitions&gt;</pre>
            <figcaption>Fig 05-028</figcaption>
          </figure>
          <p>So, in this case, you can see that we gave a name to our Image called ProductImage and we can use an
            ElementName binding to point to that and modify the height of our Grid based on the height of that image,
            and really this should say ActualHeight.
          </p>

          <figure>
                <pre class="prettyprint">&lt;Grid Grid.Column=&quot;1&quot;
    Height=&quot;{Binding ElementName=ProductImage, Path=ActualHeight}&quot;&gt;</pre>
            <figcaption>Fig 05-029</figcaption>
          </figure>
          <p>Whenever you bind to a Height or Width, make sure you're binding to the ActualHeight or ActualWidth.</p>
          <p>Likewise, I could add a couple more Row definitions to this nested Grid, and then drop down and add a
            couple more TextBlocks:
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBlock Grid.Row=&quot;2&quot;
    Text=&quot;{Binding RelativeSource={RelativeSource AncestorType=ListBox}, Path=ItemsSource.Count}&quot; /&gt;
&lt;TextBlock Grid.Row=&quot;3&quot;
    Text=&quot;{Binding ElementName=ProductsListBox, Path=ItemsSource.Count}&quot; /&gt;</pre>
            <figcaption>Fig 05-030</figcaption>
          </figure>
          <p>In this case, one of these is using a RelativeSource binding and you can see it's going to walk all the way
            up using the AncestorType to get to the ListBox that this is going to be rendered in.
          </p>
          <p>Even though this DataTemplate itself does not explicitly know about the ListBox, this stuff all comes
            together at runtime into the Visual Tree. So an ancestor of this TextBlock element will be somewhere up the
            chain, will be the ListBox itself.
          </p>
          <p>So we can walk all the way up there, use the ListBox as our Source object, and then we could us a Path that
            dots down to the ItemsSource, which will be our Products Collection, and the Count on that Collection, and
            render that out in a TextBox.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBlock Grid.Row=&quot;2&quot;
    Text=&quot;{Binding RelativeSource={RelativeSource AncestorType=ListBox}, Path=ItemsSource.Count}&quot; /&gt;</pre>
            <figcaption>Fig 05-031</figcaption>
          </figure>
          <p>Likewise, we can even use ElementName bindings that are outside of our CurrentDataTemplate. So the name of
            our ListBox is ProductsListBox:
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBlock Grid.Row=&quot;3&quot;
   Text=&quot;{Binding ElementName=ProductsListBox, Path=ItemsSource.Count&quot; /&gt;</pre>
            <figcaption>Fig 05-032</figcaption>
          </figure>
          <p>That's out here in the main visual tree</p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ListBox x:Name=&quot;ProductsListBox&quot; ItemsSource=&quot;{Binding Products}&quot;
                ItemTemplate=&quot;{StaticResource ProductTemplate}&quot;&gt;
    &lt;/ListBox&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-033</figcaption>
          </figure>
          <p>but at runtime, this TextBlock will be rendered as part of the overall UI so it's able to use an
            ElementName binding to locate another element within that same UI, and in this case we're going to do the
            same thing, dot down through the ItemsSource to the Count.
          </p>
          <p>With those in place, if I run right now, it's actually not going to render right because of this
            ActualHeight.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid Grid.Column=&quot;1&quot;
    Height=&quot;{Binding ElementName=ProductImage, Path=ActualHeight&quot;&gt;</pre>
            <figcaption>Fig 05-034</figcaption>
          </figure>
          <p>I wanted to show that as an example, but it'll end up truncating those fields that we just added because
            the image won't be big enough. So I'm just going to take this Height off of here and run. And now we can see
            the two 41's there:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-035.png" class="image"/>
            <figcaption>Fig 05-035</figcaption>
          </figure>
          <p>41 products in our collection, getting one by walking up the Element Tree to the ListBox, and getting the
            Products collection off of the ItemsSource there, the other one using the ElementName binding to get to the
            ListBox and gets the Products collection from there.
          </p>
          <p>Now one last thing to show is I'm going to cut this DataTemplate out of the Resource dictionary:</p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.DataContext&gt;
    &lt;local:ExplicitDataTemplatesViewModel /&gt;
&lt;/UserControl.DataContext&gt;
&lt;UserControl.Resources&gt;
&lt;/UserControl.Resources&gt;
&lt;Grid&gt;
    &lt;ListBox x:Name=&quot;ProductsListBox&quot;
             ItemsSource=&quot;{Binding Products}&quot;
             ItemTemplat=&quot;{StaticResource ProductTemplate&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-036</figcaption>
          </figure>
          <p>and show you that you can define it nested directly on the element itself.</p>
          <p>So if I go onto my ListBox and set the ItemTemplate property as a nested element here:</p>
          <figure>
<pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot;
    ItemsSource=&quot;{Binding Products}&quot;&gt;
         &lt;ListBox.ItemTemplate&gt;

         &lt;/ListBox.ItemTemplate&gt;
&lt;/ListBox&gt;</pre>
            <figcaption>Fig 05-037</figcaption>
          </figure>
          <p>and I paste that DataTemplate in there and get rid of the key because it's no longer in the Resource
            dictionary:
          </p>

          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot;
         ItemsSource=&quot;{Binding Products}&quot;&gt;
    &lt;ListBox.ItemTemplate&gt;
        &lt;DataTemplate x:Key=&quot;ProductTemplate&quot;&gt;
            &lt;Grid&gt;
                &lt;Grid.ColumnDefinitions&gt;
                    &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
                    &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
                &lt;/Grid.ColumnDefinitions&gt;
                &lt;Image x:Name=&quot;ProductImage&quot;
                       Source=&quot;{Binding Image}&quot;
                       Margin=&quot;5&quot;
                       Width=&quot;100&quot; /&gt;
                &lt;Grid Grid.Column=&quot;1&quot;&gt;
                    &lt;Grid.RowDefinitions&gt;
                        &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
                        &lt;RowDefinition Height=&quot;Auto&quot; /&gt;</pre>
            <figcaption>Fig 05-038</figcaption>
          </figure>
          <p>now the structure here is similar to what we did with our DataContext being set to an instance of a
            ViewModel.
          </p>
          <p>Here we're really just setting the ItemTemplate property of the ListBox explicitly to an instance of a
            DataTemplate. That works exactly the same:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-039.png" class="image"/>
            <figcaption>Fig 05-039</figcaption>
          </figure>
          <p>We can see the same visual rendering of our elements. The difference here is this DataTemplate:</p>
          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot;
         ItemsSource=&quot;{Binding Products}&quot;&gt;
    &lt;ListBox.ItemTemplate&gt;
        &lt;DataTemplate x:Key=&quot;ProductTemplate&quot;&gt;
            &lt;Grid&gt;</pre>
            <figcaption>Fig 05-040</figcaption>
          </figure>
          <p>Is no longer reusable, it's only available within the context of this ListBox. So generally, I'll stick to
            defining my DataTemplate as part of a Resource dictionary, giving it a key, and then referring to that from
            the ItemTemplate property with a StaticResource.
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox x:Name=&quot;ProductsListBox&quot;
         ItemsSource=&quot;{Binding Products}&quot;&gt;
         ItemTemplate=&quot;{StaticResource ProductTemplate}&quot;/&gt;</pre>
            <figcaption>Fig 05-041</figcaption>
          </figure>
          <p>Then you could potentially move that DataTemplate out from the User Control to an application-scoped
            resource or even in the reusable class library and use it over and over again in multiple places in your
            applications.
          </p>
          <p>So that's how you use ExplicitDataTemplates. Specifically point to one through the ItemTemplate property of
            a ListBox or we'll see another example is a ContentTemplate property of a ContentControl.
          </p>
        </div>
        <div class="panel-body">
          <h3>Implicit DataTemplates</h3>
          <p>Now let's talk about ImplicitDataTemplates. ImplicitDataTemplates give you a lot more power and flexibility
            to address scenarios where you may not have a one-to-one mapping between a given DataObject type and the
            control where a specific DataTemplate is supposed to be used for that object type.
          </p>
          <p>Basically, an ImplicitDataTemplate gets associated automatically with a data-bound object based on the type
            of that object when it's being rendered. For ImplicitDataTemplates to work, the DataTemplate has to be
            defined in the Resource dictionary that is in-scope wherever that data-bound control is going to be.
          </p>
          <p>So down below you can see we have a ContentControl that's binding to a CurrentViewModel:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-042.png" class="image"/>
            <figcaption>Fig 05-042</figcaption>
          </figure>
          <p>And we placed the DataTemplate in a Resource dictionary that is somewhere upstream of that.</p>
          <p>It could be a Resource dictionary directly on the ContentControl, on the containing Grid, on the containing
            window or out at application scope, as long as it is at the same scope or a higher scope, in terms of
            resources, from the control that's going to be data binding and looking for a DataTemplate.
          </p>
          <p>Next we have to have a DataType property on our DataTemplate that matches up to the concrete type of the
            data-bound object in that data binding context. So our content down below is binding to a CurrentViewModel
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-043.png" class="image"/>
            <figcaption>Fig 05-043</figcaption>
          </figure>
          <p>That CurrentViewModel can be one of several types and, in this case, it's checking the Type of that object
            and if it matches up to be an ExplicitDataTemplatesViewModel, then this is the appropriate DataTemplate for
            it, and it will automatically select that and use it to render it out.
          </p>
          <p>Note the use of the x:Type markup extension, make sure you use that. It's very tempting to just put the
            Type name itself in quotes there, and then the DataTemplate won't work as expected. And basically,
            ImplicitDataTemplates give you a lot of flexibility now, because the object that shows up through a binding,
            such as this CurrentViewModel can dynamically change over time, between different Types and then the
            DataTemplate can select the appropriate visual representation based on that Type.
          </p>
          <p>So it could either be pushing a different ViewModel into this Content property as shown in this example, or
            it could be something like a ListBox with a collection of different types of objects in the collection based
            on some common base Type, such as Product, where each derived type has its own specific DataTemplate mapped
            to it. So let's take a look at a demo of using ImplicitDataTemplates to facilitate View switching in a
            ViewModel scenario.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Implicit DataTemplates</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-003" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\before\DataTemplates - Start\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-003"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-004" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\after\DataTemplates\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-004"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo, I'm going to show you how to use ImplicitDataTemplates to automatically associate a
            DataTemplate with a data-bound object based on its type. Starting point for this demo is the ending point
            from the last one where we showed ExplicitDataTemplates.
          </p>
          <p>Let's get started here. I'm going to add a new View in ViewModel. I'm going to call the View
            DataTemplateSelectorsView because we're going to use it in the subsequent demo for that purpose:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-044.png" class="image"/>
            <figcaption>Fig 05-044</figcaption>
          </figure>
          <p>And then I'll add a class that's called DataTemplateSelectorsViewModel.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-045.png" class="image"/>
            <figcaption>Fig 05-045</figcaption>
          </figure>
          <p>In the view, I'm going to add a single element, which is a TextBlock that just says
            DataTemplateSelectorsView so we know when that view is presented.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;TextBlock Text=&quot;DataTemplate Selectors View&quot;
               HorizontalAlignment=&quot;Center&quot;
               VerticalAlignment=&quot;Center&quot;
               FontSize=&quot;20&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-046</figcaption>
          </figure>
          <p>Basically what we're going to be setting up here is the ability to switch between child views, between our
            ExplicitDataTemplateView and our DataTemplateSelectorsView, and do that using ImplicitDataTemplates. So I'm
            going to go back to my ExplicitDataTemplateView and get rid of the explicit setting of the DataContext here:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.DataContext&gt;
    &lt;local:ExplicitDataTemplatesViewModel /&gt;
&lt;/UserControl.DataContext&gt;</pre>
            <figcaption>Fig 05-047</figcaption>
          </figure>
          <p>because this is going to end up being done now automatically through ImplicitDataTemplates.</p>
          <p>Now we're going to need some logic to switch between the ExplicitDataTemplateView and the
            DataTemplateSelectorsView, and we're going to put that logic in a ViewModel for the MainWindow. So I'm going
            to add a new ViewModel called MainWindowViewModel.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-048.png" class="image"/>
            <figcaption>Fig 05-048</figcaption>
          </figure>
          <p>And we're going to first make this a proper ViewModel by implementing the INotifyPropertyChanged
            interface:
          </p>
          <figure>
                <pre class="prettyprint">public class MainWindowViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged = delegate {};
}</pre>
            <figcaption>Fig 05-049</figcaption>
          </figure>
          <p>and then we're going to statically wire this up to our MainWindow by setting the DataContext in the
            MainWindow, similar to what we saw in a previous demo.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
    xmlns:local=&quot;clr-namespace:DataTemplates&quot;
    x:Class=&quot;DataTemplates.MainWindow&quot;
    Title=&quot;MainWindow&quot;
    Height=&quot;350&quot;
    Width=&quot;525&quot;&gt;
&lt;Window.DataContext&gt;
    &lt;local:MainWindowViewModel /&gt;
&lt;/Window.DataContext&gt;</pre>
            <figcaption>Fig 05-050</figcaption>
          </figure>
          <p>I'm going to get rid of this explicit instance of our ExplicitDataTemplatesView:</p>
          <figure>
                <pre class="prettyprint">&lt;Window.DataContext&gt;
        &lt;local:MainWindowViewModel /&gt;
    &lt;/Window.DataContext&gt;
    &lt;Grid&gt;&lt;local:ExplicitDataTemplateView /&gt;
    &lt;/Grid&gt;
&lt;/Window&gt;</pre>
            <figcaption>Fig 05-051</figcaption>
          </figure>
          <p>And what we're going to do is drop back into our ViewModel and declare a property called
            CurrentViewModel:
          </p>
          <figure>
                <pre class="prettyprint">public object CurrentViewModel
{
    get
    {
        return _CurrentViewModel;
    }
    set
    {
        _CurrentViewModel = value;
        PropertyChanged(this, new PropertyChangedEventArgs(&quot;CurrentViewModel&quot;));
    }
}</pre>
            <figcaption>Fig 05-052</figcaption>
          </figure>
          <p>So the idea is that we can set an instance of a ViewModel into this property and data bind to it from the
            MainWindow, and that will cause the current rendered child view to switch out.
          </p>
          <p>So now we need some ViewModels to switch between. I'm going to pop in here two more MemberVariables, one an
            instance of our ExplicitDataTemplatesViewModel and one an instance of our DataTemplateSelectorsViewModel.
          </p>
          <figure>
                <pre class="prettyprint">private object _CurrentViewModel;
ExplicitDataTemplatesViewModel _ViewModel1 = new ExplicitDataTemplatesViewModel();
DataTemplateSelectorsViewModel _ViewModel2 = new DataTemplateSelectorsViewModel();</pre>
            <figcaption>Fig 05-053</figcaption>
          </figure>
          <p>Now we need some logic that's actually going to switch between those two and we're going to do that with
            Commands.
          </p>
          <figure>
                <pre class="prettyprint">public MainWindowViewModel()
{
    View1Command = new RelayCommand(ShowView1);
    View2Command = new RelayCommand(ShowView2);
    CurrentViewModel = _ViewModel1;
}
public RelayCommand View1Command { get; set; }
public RelayCommand View2Command { get; set; }</pre>
            <figcaption>Fig 05-054</figcaption>
          </figure>
          <p>So I've added two RelayCommands to my MainWindowViewModel, View1Command and View2Command, that can be
            triggered from the MainWindow. You can see the handling is simply to set the CurrentViewModel to the
            respective ViewModel.
          </p>
          <figure>
                <pre class="prettyprint">private void ShowView1()
{
    CurrentViewModel = _ViewModel1;
}

private void ShowView2()
{
    CurrentViewModel = _ViewModel2;
}</pre>
            <figcaption>Fig 05-055</figcaption>
          </figure>
          <p>That will trigger a PropertyChanged:</p>
          <figure>
                <pre class="prettyprint">public object CurrentViewModel
{
    get
    {
        return _CurrentViewModel;
    }
    set
    {
        _CurrentViewModel = value;
        PropertyChanged(this, new PropertyChangedEventArgs(&quot;CurrentViewModel&quot;));
    }
}

public event PropertyChangedEventHandler PropertyChanged = delegate { };</pre>
            <figcaption>Fig 05-056</figcaption>
          </figure>
          <p>and now we can set up some data binding in the view to cause the right view to be rendered for that
            ViewModel using ImplicitDataTemplates. So we're going to go up here to our MainWindow and replace our main
            Grid with a grid that has two rows in it.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;Grid.RowDefinitions&gt;
        &lt;RowDefinition Height=&quot;Auto&quot;/&gt;
        &lt;RowDefinition Height=&quot;*&quot;/&gt;
    &lt;/Grid.RowDefinitions&gt;
    &lt;StackPanel Grid.Row=&quot;0&quot; Orientation=&quot;Horizontal&quot;&gt;
        &lt;Button Content=&quot;Explicit DataTemplates View&quot; Command=&quot;{Binding View1Command}&quot;/&gt;
        &lt;Button Content=&quot;DataTemplateSelectors View&quot; Command=&quot;{Binding View2Command}&quot;/&gt;
    &lt;/StackPanel&gt;
    &lt;ContentControl Grid.Row=&quot;1&quot; Content=&quot;{Binding CurrentViewModel}&quot;/&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-057</figcaption>
          </figure>
          <p>The first row has a StackPanel with two Buttons. Each Button is wired up to its respective Command,
            view1Command and View2Command, on the current DataContext, which is our MainWindowViewModel.
          </p>
          <p>Then in the second row we just have a ContentControl:</p>
          <figure>
            <pre class="prettyprint">&lt;ContentControl Grid.Row=&quot;1&quot; Content=&quot;{Binding CurrentViewModel}&quot;/&gt;</pre>
            <figcaption>Fig 05-058</figcaption>
          </figure>
          <p>The ContentControl in WPF is a nice little container control that you set the content to some UI element
            and that UI element will be rendered out in the child area of that control. Now you can set the Content
            property explicitly to a UI element, or you can set the Content property to a data-bound object and use
            DataTemplates to render out that object.
          </p>
          <p>So here you can see I'm setting the Content property to our CurrentViewModel property back in our
            MainWindowViewModel.
          </p>
          <p>Now as we saw in previous demos, if we did nothing else it would just do a ToString on whatever that
            ViewModel is and it wouldn't look the way we want it, so what we want to do is supply a DataTemplate that's
            going to be automatically married up with the appropriate ViewModel Type to render out a corresponding view
            for that ViewModel.
          </p>
          <p>So what I can do is go up here in my Window and add a Resources section.</p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:ExplicitDataTemplatesViewModel}&quot;&gt;
        &lt;local:ExplicitDataTemplatesView/&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:DataTemplateSelectorsViewModel}&quot;&gt;
        &lt;local:DataTemplateSelectorsView/&gt;
    &lt;/DataTemplate&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 05-059</figcaption>
          </figure>
          <p>And in that Resource section I define two DataTemplates, one that is mapped through the DataType property
            to the ExplicitDataTemplateViewModel Type. Notice the x:Type markup extension here, it's very easy to forget
            this, and if so, your DataTemplates won't work correctly.
          </p>
          <p>But anytime you set the DataType property, notice we don't have to set a key even though we're in a
            Resource dictionary, because the key will implicitly be the DataType. But what's going to happen here is
            that anything that's data-bound where this Resource is in scope, specifically our ContentControl:
          </p>
          <figure>
                <pre class="prettyprint">&lt;ContentControl Grid.Row=&quot;1&quot;
    Content=&quot;{Binding CurrentViewModel&quot; /&gt;</pre>
            <figcaption>Fig 05-060</figcaption>
          </figure>
          <p>that's binding content to one or the other of those ViewModel Types. The data binding is actually going to
            look out into all the Resources that are currently in scope, see if there is a DataTemplate mapped to the
            type of the object that's currently being rendered, and if so, it will render out whatever the contents of
            that DataTemplate are.
          </p>
          <p>The contents of this DataTemplate is nothing more than our User Control that represents our view in the
            MVVM pattern. And remember that I said in a previous demo that whenever a DataTemplate is rendered out,
            whatever the root element of that DataTemplate is will have its DataContext set to the DataObject for which
            it's being rendered.
          </p>
          <p>So basically, the view's DataContext will be set to the instance of the ViewModel that it's being rendered
            out for. So we have one map to one ViewModel Type, one map to another ViewModel Type, and again, we're
            switching which ViewModel is being set in the Command handling of our MainWindowViewModel:
          </p>
          <figure>
                <pre class="prettyprint">private void ShowView1()
{
    CurrentViewModel = _ViewModel1;
}

private void ShowView2()
{
    CurrentViewModel = _ViewModel2;
}</pre>
            <figcaption>Fig 05-061</figcaption>
          </figure>
          <p>With that code in place, I can go ahead and run, and now we can see the two buttons up at the top, I can
            click on the DataTemplateSelectorsView, we switch to that one.
          </p>

          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-062.png" class="image"/>
            <figcaption>Fig 05-062</figcaption>
          </figure>
          <p>I can click on the ExplicitDataTemplatesView and we switch to that one.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-063.png" class="image"/>
            <figcaption>Fig 05-063</figcaption>
          </figure>
          <p>And again, the chain of events there are, we're clicking on the button that fires the Command:</p>
          <figure>
                <pre class="prettyprint">&lt;Button Content=&quot;Explicit DataTemplates View&quot;
                    Command=&quot;{Binding View1Command}&quot;/&gt;</pre>
            <figcaption>Fig 05-064</figcaption>
          </figure>
          <p>The Command is wired up to set one or the other ViewModel as the CurrentViewModel:</p>
          <figure>
                <pre class="prettyprint">private void ShowView1()
{
    CurrentViewModel = _ViewModel1;
}

private void ShowView2()
{
    CurrentViewModel = _ViewModel2;
}</pre>
            <figcaption>Fig 05-065</figcaption>
          </figure>
          <p>That triggers a PropertyChange on the CurrentViewModel:</p>
          <figure>
                <pre class="prettyprint">public object CurrentViewModel
{
    get
    {
        return _CurrentViewModel;
    }
    set
    {
        _CurrentViewModel = value;
        PropertyChanged(this, new PropertyChangedEventArgs(&quot;CurrentViewModel&quot;));
    }
}</pre>
            <figcaption>Fig 05-066</figcaption>
          </figure>
          <p>which is bound to the Content property.</p>
          <figure>
            <pre class="prettyprint">&lt;ContentControl Grid.Row=&quot;1&quot; Content=&quot;{Binding CurrentViewModel}&quot;/&gt;</pre>
            <figcaption>Fig 05-067</figcaption>
          </figure>
          <p>Now that a new DataObject has shown up in the Content property through a binding, Control goes out and
            looks in the available Resources, finds the corresponding DataTemplate mapped to that DataType:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:ExplicitDataTemplatesViewModel}&quot;&gt;
        &lt;local:ExplicitDataTemplatesView/&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:DataTemplateSelectorsViewModel}&quot;&gt;
        &lt;local:DataTemplateSelectorsView/&gt;
    &lt;/DataTemplate&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 05-068</figcaption>
          </figure>
          <p>And renders out the corresponding view for it, setting the DataContext of that root element of the
            DataTemplate to whatever the DataObject is it's mapped to. And that's how you can use ImplicitDataTemplates
            to render out views and ViewModels.
          </p>
          <p>ImplicitDataTemplates can also certainly be used for heterogeneous collections. Say that you had a bunch of
            subtypes of product that you were going to render out in a ListBox and you wanted to have a different
            DataTemplate for each subtype of a product. You could use the DataType to map to those concrete types of the
            derived types, and then you could have a ListBox bound to a collection of products. And then as it looped
            through, rendering out each product, it would find the corresponding DataTemplate based on the DataType for
            the concrete type of product that you're dealing with, and would render out that template.
          </p>
        </div>
        <div class="panel-body">
          <h3>DataTemplateSelectors</h3>
          <p>Sometimes when you want to use DataTemplates, things may be a little more dynamic and you may need to
            dynamically select the appropriate DataTemplate based on some criteria that goes beyond just the type of the
            data-bound object.
          </p>
          <p>As we just covered, if the criteria is just simply based on the type of the data-bound object, you could
            use ImplicitDataTemplates, but you might need to select based on some property value on the data-bound
            object itself, or other logic within the application, and that's where DataTemplateSelectors come in.
          </p>
          <p>DataTemplateSelectors at a high level let you dynamically select the right DataTemplate based on whatever
            logic you need to derive that, and the most common example would be to inspect some property value on the
            data-bound object and select the appropriate template based on that.
          </p>
          <p>So what you do is you derive a class from a base class called DataTemplateSelector in the framework. In
            that class, you override a SelectTemplate method so the simplest possible implementation would look
            something like this:
          </p>
          <figure>
                <pre class="prettyprint">public class ProductTemplateSelector : DataTemplateSelector
{
    public override DataTemplate SelectTemplate(object item, DependencyObject container)
    {
        DataTemplate template = LocalTemplate(item, container);
        return template;
    }
}</pre>
            <figcaption>Fig 05-069</figcaption>
          </figure>
          <p>We derive our class from DataTemplateSelector, we override the SelectTemplate method.</p>
          <p>That takes in two parameters. The first one is going to be passed the data-bound object that you're
            supposed to come up with a DataTemplate for. The second parameter is the element on which the binding is
            that this DataTemplateSelector is being used from, and you can use either of those criteria and possibly
            other logic in your application, such as who the user is, what time of day it is, and other criteria such as
            that, to determine what template to return.
          </p>
          <p>Ultimately, you invoke some logic and you come up with a DataTemplate. That logic could dynamically build
            that DataTemplate in memory, but most often you're going to go out and locate it inside of a Resource
            dictionary so that those can be declared in the DesignTime environment as XAML.
          </p>
          <p>So basically, you use whatever logic is needed and come up with a DataTemplate and return it. And then
            finally, you need to hook it up, so you're going to set the ItemTemplateSelector or ContentTemplateSelector
            property on your data-bound control depending on whether it's an ItemsControl or a ContentControl.
          </p>
          <p>So let's take a look at a demo of using DataTemplateSelectors to dynamically select the appropriate
            DataTemplate.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: DataTemplateSelectors</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-005" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\before\DataTemplates - Start\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-005"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-006" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\after\DataTemplates\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-006"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo, I'm going to show you how to use DataTemplateSelectors to dynamically select an appropriate
            DataTemplate based on some property of the data-bound objects. To do this, I'm first going to need to define
            a DataTemplateSelector, which is nothing more than a class.
          </p>
          <p>So I'm going to add a class here called ProductTemplateSelector.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-070.png" class="image"/>
            <figcaption>Fig 05-070</figcaption>
          </figure>
          <p>I'm going to flesh it out here by inheriting from the DataTemplateSelector class and overriding the
            SelectTemplate method on that base class, which you can see returns a DataTemplate:
          </p>
          <figure>
                <pre class="prettyprint">namespace DataTemplates
{
    public class ProductTemplateSelector : DataTemplateSelector
    {
        public override DataTemplate SelectTemplate(object item, DependencyObject container)
        {
            Product product = item as Product;
            FrameworkElement element = container as FrameworkElement;
            if (product == null || element == null) return null;

            DataTemplate template = element.FindResource(product.Type + &quot;Template&quot;) as DataTemplate;
            return template;
        }
    }
}</pre>
            <figcaption>Fig 05-071</figcaption>
          </figure>
          <p>It takes in two arguments, the first of which is the data-bound object that's being rendered through a
            binding. The second is the element on which the binding is attached to. From there, your logic can figure
            out however it needs to, how to come up with a DataTemplate.
          </p>
          <p>Now the implementation I'm showing here is a simple reusable version where I know that I'm going to be
            using this for Products, so I can go ahead and cast the data-bound object to a Product object.
          </p>
          <figure>
            <pre class="prettyprint">Product product = item as Product;</pre>
            <figcaption>Fig 05-072</figcaption>
          </figure>
          <p>Likewise, I can cast the container to a framework element.</p>
          <figure>
            <pre class="prettyprint">FrameworkElement element = container as FrameworkElement;</pre>
            <figcaption>Fig 05-073</figcaption>
          </figure>
          <p>As long as both of those casts succeeded, this TemplateSelector must be hooked up in the place I expect it
            to be. If not, I can just punt here and return null.
          </p>
          <figure>
            <pre class="prettyprint">if (product == null || element == null) return null;</pre>
            <figcaption>Fig 05-074</figcaption>
          </figure>
          <p>But as long as I got that far, then I can go and invoke some logic to figure out what DataTemplate to use
            based on the product that I'm seeing. Now the simple logic I have wired up here is that a product has a Type
            property on it:
          </p>
          <figure>
            <pre class="prettyprint">DataTemplate template = element.FindResource(product.Type + &quot;Template&quot;) as DataTemplate;</pre>
            <figcaption>Fig 05-075</figcaption>
          </figure>
          <p>and that Type is going to be pizza, salad or drink in our Zza data examples.</p>
          <p>If I just concatenate Template onto the end of that and assume that out in the current Resource dictionary
            for the element that this binding is on, there is a DataTemplate named that template, then I can locate it
            with a FindResource and just return that.
          </p>
          <p>Now obviously, you could have whatever convoluted logic you want here:</p>
          <figure>
                <pre class="prettyprint">DataTemplate template = element.FindResource(product.Type + &quot;Template&quot;) as DataTemplate;
            return template;</pre>
            <figcaption>Fig 05-076</figcaption>
          </figure>
          <p>you could new up a DataTemplate from scratch and dynamically populate its elements from programmatic code.
            Generally you're going to want to declare these in XAML and locate them as a Resource, as I'm doing here,
            through some kind of naming convention. Now we need to go ahead and hook this up to our data-bound context.
          </p>
          <p>So what I'm going to do is go out to a View I created in a previous demo called DataTemplateSelectorsView,
            and I'm going to add in a Resources section that creates an instance of my ProductTemplateSelector, and I'll
            need a local namespace up above.
          </p>
          <figure>
                <pre class="prettyprint">    xmlns:local=&quot;clr-namespace:DataTemplates&quot;
    mc:Ignorable=&quot;d&quot;
    d:DesignHeight=&quot;300&quot;
    d:DesignWidth=&quot;300&quot;&gt;
&lt;UserControl.Resources&gt;
    &lt;local:ProductTemplateSelector x:Key=&quot;ProductTemplateSelector&quot; /&gt;
&lt;/UserControl.Resources&gt;</pre>
            <figcaption>Fig 05-077</figcaption>
          </figure>
          <p>Now that I have an instance of that Selector available, I can use it in the data-bound Context. So I'm
            going to replace my TextBox down here with a ListBox. We'll bind the ItemsSource of that ListBox to Products
            and we'll set a property called ItemTemplateSelector, pointing through a StaticResource to the instance of
            our ProductTemplateSelector.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ListBox ItemsSource=&quot;{Binding Products}&quot;
             ItemTemplateSelector=&quot;{StaticResource ProductTemplateSelector}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-078</figcaption>
          </figure>
          <p>Now we just need to get these products from somewhere, so I'm going to wire that up in the ViewModel for
            this View. So if I go to the DataTemplateSelectorsViewModel and replace that class with something similar to
            what we've seen before:
          </p>
          <figure>
                <pre class="prettyprint">public class DataTemplateSelectorsViewModel : INotifyPropertyChanged
{
    private ObservableCollection&lt;Product&gt; _Products;

    public DataTemplateSelectorsViewModel()
    {
        if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
        {
            ZzaDbContext context = new ZzaDbContext();
            Products = new ObservableCollection&lt;Product&gt;(context.Products.ToList());
        }
    }
    public ObservableCollection&lt;Product&gt; Products
    {
        get
        {
            return _Products;
        }
        set
        {
            if (value != _Products)
            {
                _Products = value;</pre>
            <figcaption>Fig 05-079</figcaption>
          </figure>
          <p>We have a Products collection exposed. We only populate that Products collection from the database if we're
            not in Design mode and it raises PropertyChanged events when it gets set.
          </p>
          <p>So now how is that ViewModel getting hooked up to our view? Well, if you remember from the
            ImplicitDataTemplates demo, it's being automatically associated through the DataTemplates out in the
            MainWindow.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:ExplicitDataTemplatesViewModel}&quot;&gt;
        &lt;local:ExplicitDataTemplatesView/&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:DataTemplateSelectorsViewModel}&quot;&gt;
        &lt;local:DataTemplateSelectorsView/&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:HierachicalDataTemplatesViewModel}&quot;&gt;
        &lt;local:HierarchicalDataTemplatesView/&gt;
    &lt;/DataTemplate&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 05-080</figcaption>
          </figure>
          <p>So remember we had this DataTemplateSelectorViewModel ImplicitDataTemplate rendering out the
            DataTemplateSelectorsView, which will set its DataContext to the instance of the ViewModel
          </p>
          <p>So the only thing we have left to do is define the DataTemplates that are going to be rendered out by our
            ProductTemplateSelector. So if we add into our Resources section here, three DataTemplates:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
        &lt;local:ProductTemplateSelector x:Key=&quot;ProductTemplateSelector&quot; /&gt;
        &lt;DataTemplate x:Key=&quot;pizzaTemplate&quot;&gt;
            &lt;Grid&gt;
                &lt;Grid.ColumnDefinitions&gt;
                    &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
                    &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
                &lt;/Grid.ColumnDefinitions&gt;
                &lt;Image Source=&quot;Images/pizza.jpg&quot;
                       Width=&quot;100&quot;
                       Height=&quot;100&quot; /&gt;
                &lt;TextBlock Text=&quot;{Binding Name}&quot;
                           Grid.Column=&quot;1&quot; /&gt;
            &lt;/Grid&gt;
        &lt;/DataTemplate&gt;
        &lt;DataTemplate x:Key=&quot;saladTemplate&quot;&gt;
            &lt;Grid&gt;
                &lt;Grid.ColumnDefinitions&gt;
                    &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
                    &lt;ColumnDefinition Width=&quot;*&quot; /&gt;</pre>
            <figcaption>Fig 05-081</figcaption>
          </figure>

          <p>One called pizzaTemplate, one called saladTemplate, and one called drinkTemplate, the Type property on the
            product is going to be salad, drink or pizza, and we concatenate that template name onto it inside of our
            ProductTemplateSelector. Each of these:
          </p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate x:Key=&quot;pizzaTemplate&quot;&gt;
    &lt;Grid&gt;
        &lt;Grid.ColumnDefinitions&gt;
            &lt;ColumnDefinition Width=&quot;Auto&quot; /&gt;
            &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
        &lt;/Grid.ColumnDefinitions&gt;
        &lt;Image Source=&quot;Images/pizza.jpg&quot;
               Width=&quot;100&quot;
               Height=&quot;100&quot; /&gt;
        &lt;TextBlock Text=&quot;{Binding Name}&quot;
                   Grid.Column=&quot;1&quot; /&gt;
    &lt;/Grid&gt;
&lt;/DataTemplate&gt;
&lt;DataTemplate x:Key=&quot;saladTemplate&quot;&gt;</pre>
            <figcaption>Fig 05-082</figcaption>
          </figure>
          <p>is just going to render out a simple representation of a pizza, salad or drink. So by setting that
            ItemTemplateSelector, it will invoke our DataTemplateSelector, and we can run, go to the
            DataTemplateSelectorsView, and there you can see the pizzas look like that:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-083.png" class="image"/>
            <figcaption>Fig 05-083</figcaption>
          </figure>
          <p>the salads look like that:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-084.png" class="image"/>
            <figcaption>Fig 05-084</figcaption>
          </figure>
          <p>and the drinks look like that.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-085.png" class="image"/>
            <figcaption>Fig 05-085</figcaption>
          </figure>
          <p>So by defining your own DataTemplateSelector, overriding the SelectTemplate, and invoking whatever logic is
            needed inside your DataTemplateSelector, you can dynamically return whatever DataTemplate is needed for your
            scenario.
          </p>
        </div>
        <div class="panel-body">
          <h3>HierarchicalDataTemplates</h3>
          <p>The last kind of DataTemplate we'll look at here is called a HierarchicalDataTemplate, and it's
            specifically designed to address hierarchical data models presented in a TreeView control in WPF, but it can
            also be used with some third party controls that present hierarchical data as well.
          </p>
          <p>The general idea is that similar to a DataTemplate, it contains a chunk of XAML that represents the visual
            structure of a data object that's going to be rendered as a node within the tree, but it has a number of
            additional properties to it to capture the fact that there are child collections and child hierarchies that
            also need to be rendered.
          </p>
          <p>The first of those is the ItemsSource property on the HierarchicalDataTemplate. Basically, this points to a
            property on the current node object that should be a child collection of objects, and it indicates to the
            TreeView control that there are more child items to be rendered there.
          </p>
          <p>Then there is the ItemTemplate property on the HierarchicalDataTemplate. This provides a DataTemplate for
            how do you render those child objects in that child collection.
          </p>
          <p>If you have fairly static structure to the object model, this is all you'll need. If you have a more
            dynamic scenario, there is an ItemTemplateSelector property so you can use a DataTemplateSelector, as we
            covered earlier in the module, to dynamically determine which DataTemplate to use given the type or property
            values on the data-bound child objects.
          </p>
          <p>You can also use ImplicitDataTemplates with HierarchicalDataTemplates, so it has a DataType property just
            like a normal DataTemplate does, that you can set to a Type and it can automatically map up based on the
            concrete type of the node that's being rendered which DataTemplate to use. So let's take a look at a demo of
            using HierarchicalDataTemplates.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: HierarchicalDataTemplates</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-007" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\before\DataTemplates - Start\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-007"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex06-008" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 6\after\DataTemplates\DataTemplates.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex06-008"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo, I'm going to show you how to work with HierarchicalDataTemplates, which are a special kind of
            DataTemplate that work with TreeView controls, as well as with other hierarchical data-bound third party
            vendor components.
          </p>
          <p>The starting point here is where we left off in the last demo where we had our ImplicitDataTemplates
            allowing us to switch between multiple views, the ExplicitDataTemplatesViewModel and the
            DataTemplateSelectorsViewModel.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-086.png" class="image"/>
            <figcaption>Fig 05-086</figcaption>
          </figure>
          <p>I've added one more view here that we're going to start fleshing out in this demo called
            HierarchicalDataTemplateView and ViewModel. And to get those switching, the way we did the other views, I
            added another ViewModel instance to the MainWindowViewModel:
          </p>
          <figure>
                <pre class="prettyprint">public class MainWindowViewModel : INotifyPropertyChanged
{
    private object _CurrentViewModel;
    ExplicitDataTemplatesViewModel _ViewModel1 = new ExplicitDataTemplatesViewModel();
    DataTemplateSelectorsViewModel _ViewModel2 = new DataTemplateSelectorsViewModel();
    HierachicalDataTemplatesViewModel _ViewModel3 = new HierachicalDataTemplatesViewModel();</pre>
            <figcaption>Fig 05-087</figcaption>
          </figure>
          <p>another Command to trigger switching to that view:</p>
          <figure>
                <pre class="prettyprint"> public MainWindowViewModel()
{
    View1Command = new RelayCommand(ShowView1);
    View2Command = new RelayCommand(ShowView2);
    View3Command = new RelayCommand(ShowView3);
    CurrentViewModel = _ViewModel1;
}</pre>
            <figcaption>Fig 05-088</figcaption>
          </figure>
          <p>and the Command handler that sets that as the CurrentViewModel on the MainWindowViewModel.</p>
          <figure>
                <pre class="prettyprint">private void ShowView3()
{
    CurrentViewModel = _ViewModel3;
}</pre>
            <figcaption>Fig 05-089</figcaption>
          </figure>
          <p>So that should all look familiar from the ImplicitDataTemplates demo. So if I run at this point, I can
            start up the app. We'll have three buttons now at the top of the screen:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-090.png" class="image"/>
            <figcaption>Fig 05-090</figcaption>
          </figure>
          <p>and I can switch between the DataTemplateSelectorsView, the ExplicitDataTemplatesView, and this new blank
            HierarchicalDataTemplatesView and its corresponding ViewModel.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-091.png" class="image"/>
            <figcaption>Fig 05-091</figcaption>
          </figure>
          <p>So the first thing we're going to want is some real data to work with, in our ViewModel, so I fleshed out
            some code here. You can see that our ViewModel implements INotifyPropertyChanged, as usual:
          </p>
          <figure>
            <pre
              class="prettyprint">public class HierachicalDataTemplatesViewModel : INotifyPropertyChanged</pre>
            <figcaption>Fig 05-092</figcaption>
          </figure>
          <p>We have a constructor that is, only when we're not in the Designer, going out to the database through our
            DBContext and retrieving the Customers collection from our DBContext.
          </p>
          <figure>
                <pre class="prettyprint">public HierachicalDataTemplatesViewModel()
{
    if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
    {
        using (ZzaDbContext context = new ZzaDbContext())
        {
            Customers = new ObservableCollection&lt;Customer&gt;(
                context.Customers.Include(&quot;Orders&quot;)
                .Include(&quot;Orders.OrderItems&quot;)
                .Include(&quot;Orders.OrderItems.Product&quot;).ToList());
        }
    }
}</pre>
            <figcaption>Fig 05-093</figcaption>
          </figure>
          <p>In this case, however, it's also using the .Include method of Entity Framework to retrieve the related
            Orders, OrderItems, and the Product for each OrderItem, which sets up a hierarchical data object graph for
            us to work with in this demo.
          </p>
          <p>The exposed property from our ViewModel is just the root Customers collection:</p>
          <figure>
                <pre class="prettyprint">private ObservableCollection&lt;Customer&gt; _Customers;
public ObservableCollection&lt;Customer&gt; Customers
{
    get
    {
        return _Customers;
    }
    set
    {
        _Customers = value;
        PropertyChanged(this, new PropertyChangedEventArgs(&quot;Customers&quot;));
    }
}
public event PropertyChangedEventHandler PropertyChanged = delegate { };</pre>
            <figcaption>Fig 05-094</figcaption>
          </figure>
          <p>and we're going to data bind to that in a TreeView control. So now let's go over to the view for this
            HierarchicalDataTemplate and let's add a little bit of XAML:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;DataTemplate x:Key=&quot;CustomerTemplate&quot;&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;Images/person.jpg&quot; Margin=&quot;3&quot; /&gt;
            &lt;TextBlock Text=&quot;{Binding LastName}&quot; Margin=&quot;5&quot;/&gt;
        &lt;/StackPanel&gt;
    &lt;/DataTemplate&gt;
&lt;/UserControl.Resources&gt;
&lt;Grid&gt;
    &lt;TreeView ItemsSouce=&quot;{Binding Customers}&quot;
              ItemTemplate=&quot;{StaticResource CustomerTemplate}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-095</figcaption>
          </figure>
          <p>What I added here in terms of the root structure of the View is a TreeView control. You can see that the
            ItemsSource is pointing to our Customers collection, which will be on our DataContext that is our ViewModel.
          </p>
          <p>Then we use the ItemTemplate as we did before with the ExplicitDataTemplates demo, to point to a Resource
            that has a DataTemplate. That DataTemplate is up at the top, named CustomerTemplate, and it's just got some
            simple structure, which is a StackPanel with an Image and a TextBlock in it.
          </p>
          <p>If we run our demo at this point, and we switch to the HierarchicalDataTemplatesView:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-096.png" class="image"/>
            <figcaption>Fig 05-096</figcaption>
          </figure>
          <p>you can see that we are getting data rendered out based on our DataTemplate, but notice there's no expander
            nodes next to these Customer objects, it's really more like a ListBox at this point, and we're not really
            getting that hierarchical presentation that we want. This is where HierarchicalDataTemplates come in.
          </p>
          <p>So I'm going to change out this normal DataTemplate for a HierarchicalDataTemplate for Customers that goes
            one level deeper to the Orders.
          </p>
          <p>So now you can see what we have is a HierarchicalDataTemplate:</p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;HierarchicalDataTemplate x:Key=&quot;CustomerTemplate&quot;
                              ItemsSource=&quot;{Binding Orders}&quot;&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;Images/person.jpg&quot;
                   Margin=&quot;3&quot;
                   Width=&quot;50&quot; /&gt;
            &lt;TextBlock Text=&quot;{Binding LastName}&quot;
                       Margin=&quot;5&quot;/&gt;
        &lt;/StackPanel&gt;
        &lt;HierarchicalDataTemplate.ItemTemplate&gt;
            &lt;DataTemplate&gt;
                &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
                    &lt;Image Source=&quot;Images/checkmark.jpg&quot;
                           Margin=&quot;3&quot;
                           Width=&quot;&quot;50&quot; /&gt;
                    &lt;TextBlock Text=&quot;{Binding Path=OrderDate, StringFormat=d}&quot;
                               Margin=&quot;5&quot; /&gt;
                &lt;/StackPanel&gt;
            &lt;/DataTemplate&gt;
        &lt;/HierarchicalDataTemplate.ItemTemplate&gt;
    &lt;/HierarchicalDataTemplate&gt;
&lt;/UserControl.Resources&gt;</pre>
            <figcaption>Fig 05-097</figcaption>
          </figure>
          <p>It still has the same key as before, so that the ItemTemplate can point to it. It's got the same root level
            structure of a StackPanel with an Image and a TextBlock next to it, but then it's got two additional things.
          </p>
          <p>The first is the ItemsSource property.</p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate x:Key=&quot;CustomerTemplate&quot;
        ItemsSource=&quot;{Binding Orders}&quot;&gt;
                </pre>
            <figcaption>Fig 05-098</figcaption>
          </figure>
          <p>The ItemsSource property on a HierarchicalDataTemplate points to some property hanging off of the current
            node object, which will be a customer, in this case, that is a collection itself, a child collection. So in
            this case, the child collection of orders for a given customer will be on an Orders property of the Customer
            object. That sets up the notion that there's more to render at a child level, and then the ItemTemplate
            property of the HierarchicalDataTemplate allows us to supply what is the DataTemplate that is going to be
            used to render that.
          </p>
          <p>And here, one level down:</p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate.ItemTemplate&gt;
    &lt;DataTemplate&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;Images/checkmark.jpg&quot;
                   Margin=&quot;3&quot;
                   Width=&quot;&quot;50&quot; /&gt;
            &lt;TextBlock Text=&quot;{Binding Path=OrderDate, StringFormat=d}&quot;
                       Margin=&quot;5&quot; /&gt;
        &lt;/StackPanel&gt;
    &lt;/DataTemplate&gt;
&lt;/HierarchicalDataTemplate.ItemTemplate&gt;
                </pre>
            <figcaption>Fig 05-099</figcaption>
          </figure>
          <p>we can see we can just use a normal DataTemplate at that level and we have some simple structure there with
            another StackPanel with an Image and a TextBlock, in this case, binding against the OrderDate using a
            StringFormat for a short Date string and we'll have the Image pointing to some stock image there.
          </p>
          <p>With that in place, if we run, we'll get one level of expansion based on that Orders collection, on each
            customer. So we go to the HierarchicalDataTemplatesView, you can see we have the Expander icon here, and
            when we expand, we see the orders for Puckett and the orders for Russell, and so on.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-100.png" class="image"/>
            <figcaption>Fig 05-100</figcaption>
          </figure>
          <p>Now we can take this even deeper and I can replace this HierarchicalDataTemplate with an even bigger one
            that goes one level deeper. So we still have the root HierarchicalDataTemplate that our ItemTemplate is
            pointing to.
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;HierarchicalDataTemplate x:Key=&quot;CustomerTemplate&quot;
                              ItemsSource=&quot;{Binding Orders}&quot;&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;Images/person.jpg&quot;
                   Margin=&quot;3&quot;
                   Width=&quot;50&quot; /&gt;
            &lt;TextBlock Text=&quot;{Binding LastName}&quot;
                       Margin=&quot;5&quot;/&gt;
        &lt;/StackPanel&gt;
        &lt;HierarchicalDataTemplate.ItemTemplate&gt;
            &lt;HierarchicalDataTemplate ItemsSource=&quot;{Binding OrderItems}&quot;&gt;
                &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
                    &lt;Image Source=&quot;Images/checkmark.jpg&quot;
                           Margin=&quot;3&quot;
                           Width=&quot;&quot;50&quot; /&gt;
                    &lt;TextBlock Text=&quot;{Binding Path=OrderDate, StringFormat=d}&quot;
                               Margin=&quot;5&quot; /&gt;</pre>
            <figcaption>Fig 05-101</figcaption>
          </figure>

          <p>It's got the binding to the Orders collection on each customer and the structure for each customer. Then
            it's got the ItemTemplate for each Order in that Orders collection, which again, has its root structure
            that's a StackPanel, but then it has its own ItemsSource that says each order has an OrderItems property.
          </p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate.ItemTemplate&gt;
    &lt;HierarchicalDataTemplate ItemsSource=&quot;{Binding OrderItems}&quot;&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;Images/checkmark.jpg&quot; Margin=&quot;3&quot; Width=&quot;50&quot;/&gt;
            &lt;TextBlock Text=&quot;{Binding Path=OrderDate, StringFormat=d}&quot; Margin=&quot;5&quot;/&gt;
        &lt;/StackPanel&gt;
        &lt;HierarchicalDataTemplate.ItemTemplate&gt;
            &lt;DataTemplate&gt;
                &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
                    &lt;Border BorderBrush=&quot;Blue&quot; BorderThickness=&quot;2&quot; CornerRadius=&quot;3&quot;&gt;
                        &lt;Image Source=&quot;Images/items.jpg&quot; Margin=&quot;3&quot; Width=&quot;50&quot;/&gt;
                    &lt;/Border&gt;</pre>
            <figcaption>Fig 05-102</figcaption>
          </figure>

          <p>For each OrderItem, what is the template for that? We go another level down and specify the ItemTemplate
            for that child HierarchicalDataTemplate and give it some structure:
          </p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate.ItemTemplate&gt;
    &lt;DataTemplate&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Border BorderBrush=&quot;Blue&quot; BorderThickness=&quot;2&quot; CornerRadius=&quot;3&quot;&gt;
                &lt;Image Source=&quot;Images/items.jpg&quot; Margin=&quot;3&quot; Width=&quot;50&quot;/&gt;
            &lt;/Border&gt;
            &lt;TextBlock Text=&quot;{Binding Path=Product.Name, StringFormat=d}&quot; Margin=&quot;5&quot; VerticalAlignment=&quot;Center&quot;/&gt;
        &lt;/StackPanel&gt;
    &lt;/DataTemplate&gt;
&lt;/HierarchicalDataTemplate.ItemTemplate&gt;</pre>
            <figcaption>Fig 05-103</figcaption>
          </figure>
          <p>And in this case, if this is our leaf node, we can just use a standard DataTemplate. So if we run this, go
            to the HierarchicalDataTemplatesView, expand down to Orders, and expand down to OrderItems, then we can see
            we have different icons and different levels for those.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-104.png" class="image"/>
            <figcaption>Fig 05-104</figcaption>
          </figure>
          <p>Now the problem with what we've shown so far is, this works if there's a single child collection per level
            of the hierarchy that you want to drill down into, but what if there's multiple child collections and what
            if they are composed of heterogeneous derived types from some base type, such as Product as a base type and
            then specific product-derived types that have their own DataTemplates? Well, the good news is, you can mix
            HierarchicalDataTemplates with the concept of ImplicitDataTemplates.
          </p>
          <p>So I'm going to replace all of these HierarchicalDataTemplates with a series of three DataTemplates in our
            Resource collection.
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;HierarchicalDataTemplate DataType=&quot;{x:Type data:Customer}&quot; ItemsSource=&quot;{Binding Orders}&quot;&gt;
        &lt;TextBlock Text=&quot;{Binding LastName}&quot;/&gt;
    &lt;/HierarchicalDataTemplate&gt;
    &lt;HierarchicalDataTemplate DataType=&quot;{x:Type data:Order}&quot; ItemsSource=&quot;{Binding OrderItems}&quot;&gt;
        &lt;TextBlock Text=&quot;{Binding OrderDate}&quot;/&gt;
    &lt;/HierarchicalDataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type data:OrderItem}&quot;&gt;
        &lt;TextBlock Text=&quot;{Binding Product.Name}&quot;/&gt;
    &lt;/DataTemplate&gt;
&lt;/UserControl.Resources&gt;
&lt;Grid&gt;
    &lt;TreeView ItemsSource=&quot;{Binding Customers}&quot;/&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-105</figcaption>
          </figure>
          <p>Notice these are ImplicitDataTemplates using the DataType property to say, if a given data-bound node
            happens to be a Customer object, then we render it out with this content
          </p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate DataType=&quot;{x:Type data:Customer}&quot; ItemsSource=&quot;{Binding Orders}&quot;&gt;
    &lt;TextBlock Text=&quot;{Binding LastName}&quot;/&gt;
&lt;/HierarchicalDataTemplate&gt;
                </pre>
            <figcaption>Fig 05-106</figcaption>
          </figure>
          <p>as our DataTemplate and we can have an ItemSource for that. Now we don't have to specify the ItemTemplate
            here for those orders, because that can be matched up with a separate ImplicitDataTemplate:
          </p>
          <figure>
                <pre class="prettyprint">&lt;HierarchicalDataTemplate DataType=&quot;{x:Type data:Order}&quot; ItemsSource=&quot;{Binding OrderItems}&quot;&gt;
    &lt;TextBlock Text=&quot;{Binding OrderDate}&quot;/&gt;
&lt;/HierarchicalDataTemplate&gt;</pre>
            <figcaption>Fig 05-107</figcaption>
          </figure>
          <p>so here we have another ImplicitDataTemplate that maps to Order objects and it knows how to render out
            those nodes and what child collection it can bind against on those nodes.
          </p>
          <p>And then finally, down at the leaf node level, for OrderItem, it's got the structure for those</p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate DataType=&quot;{x:Type data:OrderItem}&quot;&gt;
    &lt;TextBlock Text=&quot;{Binding Product.Name}&quot;/&gt;
&lt;/DataTemplate&gt;
                </pre>
            <figcaption>Fig 05-108</figcaption>
          </figure>
          <p>So then we just get rid of the ItemTemplate down here:</p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;TreeView ItemsSource=&quot;{Binding Customers}&quot;/&gt;
    &lt;!--&lt;TreeView ItemsSource=&quot;{Binding Customers}&quot; ItemTemplate=&quot;{StaticResource CustomerTemplate}&quot;/&gt;--&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-109</figcaption>
          </figure>
          <p>and go ahead and run, switch to the HierarchicalDataTemplatesView, and now you can see the rendering is
            simpler.
          </p>
          <p>I don't have images involved in the templates now, but you can see we've got the name of the customer, the
            Order Date for the order, and the Product name for the OrderItems.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig05-110.png" class="image"/>
            <figcaption>Fig 05-110</figcaption>
          </figure>
          <p>So it's able to match up the right DataTemplate for the right node in the Tree based on the type of the
            data object being rendered.
          </p>
          <p>And again, this would allow us to have multiple derived types in a heterogeneous collection in those child
            collections, and each one could render out its respective DataTemplate, similar to what we saw with
            rendering different Views for different ViewModel Types.
          </p>
        </div>
        <div class="panel-body">
          <h3>Summary</h3>
          <p>In this module, we saw how you could use DataTemplates to start to put together a much more complex visual
            structure for the way you render out individual data-bound objects.
          </p>
          <p>We saw that at a high level, DataTemplates supply that visual structure for the way you're going to render
            out a given data-bound object in a data binding scenario. And we talked about the fact that the main place
            this is going to apply is in ContentControls or ItemsControls, which certainly could be nested down inside
            of something like a cell of a DataGrid.
          </p>
          <p>First we dove into ExplicitDataTemplates where you saw you define a DataTemplate, you give it a name, and
            you explicitly hook it up to the data-bound control through the ItemTemplate property or the ContentTemplate
            property.
          </p>
          <p>Next, we looked at ImplicitDataTemplates, which can auto-associate an appropriate DataTemplate based on the
            data-bound object type, using the DataType property of the DataTemplate and the x:Type markup extension to
            point to the data object type.
          </p>
          <p>Then we covered DataTemplateSelectors, which give you a chunk of logic that you can write to dynamically
            determine which DataTemplate to use for a given data-bound object, and that logic can be based on whatever
            criteria you want. It could be based on property values on the data-bound object, or other contextual
            information about the execution environment, such as who the user is or what day it is.
          </p>
          <p>Finally, we finished off with HierarchicalDataTemplates, which apply the same capabilities to define the
            visual structure, but now we're talking about nodes in a hierarchical tree based on a hierarchical data
            model. We saw that HierarchicalDataTemplates let you specify what the child collections are at a given level
            in the hierarchy, as well as what DataTemplate to use for the objects in that level.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WPFDataBindingInDepth05DeepDiveIntoDataTemplates.vue'
}
</script>

<style scoped>

</style>
