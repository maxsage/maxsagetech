<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Containers and Collection Controls</h2>
                </div>
                <div class="panel-body">
                    <h3>Introduction</h3>
                    <p>Hi, this is Brian Noyes. In this module, we're going to dive into some of the containment scenarios
                        and the dynamic generation of contained controls based on data binding.
                    </p>
                    <p> We'll also look in more depth at the common collection controls, including ListBox, ComboBox,
                        TabControl and DataGrid. And we'll finish off by talking a little bit more about collection views,
                        which can be used to modify the collections you're data-bound to.
                    </p>
                    <p>So first up, we're going to dive into what's really going on at runtime when you have a data-driven
                        control and the composition that happens with the UI elements that are generated based on the data.
                        I'll quickly explain what's going on in concept with bullets, and then we'll dive into a demo that
                        hopefully makes it all clear, since it is dynamic in nature.
                    </p>
                    <p>Next, we'll review ComboBoxes and ListBoxes and the key data binding properties and behaviors there.
                        We've seen a lot of this in previous demos, but in those previous demos I just kind of glanced over
                        it and didn't focus one at a time on the properties you'll care about.
                    </p>
                    <p>Next, we'll get into TabControls, which TabControls are more of a structural element, but they can be
                        data-driven themselves. So we'll see a common scenario where you can use TabControls for child view
                        containment that can be dynamically-driven through data binding.
                    </p>
                    <p>Next, we'll get into the Ubiquitous DataGrid and we'll focus on some of the key properties that
                        you'll need to know to really drive a DataGrid in normal data binding scenarios. There are,
                        naturally, all kinds of deep, dark corners in the DataGrid and lots of fancy customizations of
                        appearance and things that are out of scope for this course. What I'm going to focus on are the
                        things that really drive the behavior of the DataGrid, based on it being data-bound.
                    </p>
                    <p>Finally, we'll finish out this module by revisiting Collection Views. I talked about the
                        ICollectionView interface in an earlier module, and we looked at the notion of currency driven by
                        Collection Views. Here we're going to focus on some other things it can do for you in terms of
                        manipulating the collection that you're working with to do things like sorting, filtering, grouping,
                        and master-details presentations.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Container Controls</h3>
                    <p>Let's talk quickly, in concept, about the data-driven visual composition of data-bound controls, and
                        then we'll see how it really works in the demo. So mainly what I'm focusing on here are
                        ContentControls and ItemsControls. And these controls, when you're using data binding, can
                        dynamically generate child elements.
                    </p>
                    <p>They do it based on the data-bound objects that they're pointed to. Generally, it's going to be based
                        on DataTemplates, but in the case of ItemsControls, the derived types, such as ListBox and ComboBox,
                        have other properties that can decide what to render just based on the data itself.
                    </p>
                    <p>When you're working with ContentControl, it's going to generate a ContentPresenter, and the
                        ContentPresenter is going to become the container for the data-driven content, whatever you're
                        setting as the Content property on the ContentControl through data binding.
                    </p>
                    <p>ContentPresenter is also going to show up in a lot of other controls. A Window has a root
                        ContentPresenter it uses to show the child area, UserControls derive from ContentControl,
                        TabControls contain multiple ContentControls, DataGridCells, and so on, they all use
                        ContentPresenters to render out their data-driven content.
                    </p>
                    <p>And ultimately, the DataContext is going to be set on this element as the ContentObject that's being
                        rendered out, and that's going to flow down the visual tree into something like a DataTemplate
                        that's being rendered as the content.
                    </p>
                    <p>When you're working with ItemsControls, it's going to be an ItemsPresenter as opposed to a
                        ContentPresenter. Similar concept, it's the single root container for each of the items rendered out
                        by that ItemsControl. And that is going to be a specific Type based on the control that's actually
                        rendering, so there's a ComboBoxItem Type, ListBoxItem Type, TabItem, and so on.
                    </p>
                    <p>When it goes and renders out one of those items, generally somewhere down the chain of that item
                        there's going to be a ContentPresenter because that item represents a single piece of content, and
                        the way a single piece of content gets rendered out in a data-bound scenario is through a
                        ContentPresenter.
                    </p>
                    <p>And just like with a ContentPresenter inside a ContentControl, the DataContext on each item
                        container, specifically, ComboBoxItem, ListBoxItem, and so on, is going to be set to the individual
                        data object that's being rendered out within that ItemsControl.
                    </p>
                    <p>So that's a lot of words and lofty concepts. Let's drill into a demo that will make this more
                        concrete by digging in to the visual tree and seeing what's going on when data binding is happening.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Inspecting the Visual Tree</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-001" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\ContentAndItemsControls\ContentAndItemsControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-001">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-002" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\ContentAndItemsControls\ContentAndItemsControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-002">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>In this demo, I want to get familiar with the dynamic generation of data-bound elements when you're
                        working with ContentControls and ItemsControls in data binding scenarios. These controls generate
                        the rendering of the data-bound objects dynamically, and that adds elements to the visual tree.
                    </p>
                    <p>Understanding what's going on down at that level can be very helpful in diagnosing and debugging
                        problems when they occur in your UI and in data binding scenarios. But because none of those
                        elements exist in design time, if you haven't seen it in action, you may not know where to go.
                    </p>
                    <p>Starting point for this demo is a simple WPF project:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-001.png" class="image"/>
                        <figcaption>Fig 07-001</figcaption>
                    </figure>
                    <p>That already has a little bit of code in the code-behind for going out and getting the Products
                        Collection from our ZzaDBContext, similar to previous demos:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void Window_Loaded(object sender, RoutedEventArgs e)
{
    CollectionViewSource productViewSource =
        ((CollectionViewSource)(this.FindResource(&quot;productViewSource&quot;)));
    using (ZzaDbContext context = new ZzaDbContext())
    {
        productViewSource.Source = context.Products.ToList();
    }
}</code></pre>
                        <figcaption>Fig 07-002</figcaption>
                    </figure>
                    <p>And pushing it into a CollectionViewSource that's already up inside the View.</p>
                    <p>The code-behind also has some Helper code that's basically going to generate a Tree View, based on a
                        node in the visual tree. So I've got a Helper method here called GetTreeFromNode:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>TreeViewItem GetTreeFromNode(DependencyObject node)
{
    TreeViewItem nodeAndChildren = GetVisualTree(node, true);
    var parent = GetParent(node);
    var child = nodeAndChildren;
    TreeViewItem parentNode = null;
    while (parent != null)
    {
        parentNode = new TreeViewItem();
        parentNode.Header = GetNodeLabel(parent);
        parentNode.Items.Add(child);
        child = parentNode;
        parent = GetParent(parent);
    }
    return parentNode;
}</code></pre>
                        <figcaption>Fig 07-003</figcaption>
                    </figure>
                    <p>That's basically going to start at the current node and walk down using a Helper down below called
                        GetVisualTree.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>TreeViewItem GetVisualTree(DependencyObject rootObject, bool highlight)
{
    TreeViewItem rootItem = new TreeViewItem();
    if (highlight) rootItem.Header = &quot;[[&quot; + GetNodeLabel(rootObject) + &quot;]]&quot;;
    else rootItem.Header = GetNodeLabel(rootObject);
    for (int i = 0; i &lt; VisualTreeHelper.GetChildrenCount(rootObject); i++)
    {
        rootItem.Items.Add(GetVisualTree(VisualTreeHelper.GetChild(rootObject, i), false));
    }
    return rootItem;
}</code></pre>
                        <figcaption>Fig 07-004</figcaption>
                    </figure>
                    <p>GetVisualTree uses the VisualTreeHelper class in WPF to walk through all the children of the current
                        node, and then recursively, notice the call to GetVisualTree here, recursively walk down to its
                        children. It's basically generating a TreeViewItem, which is a node for a Tree View for each item in
                        the visual tree from the object that you pass in, annotating the node that you started with by
                        square brackets.
                    </p>
                    <p>After it's walked down from the current node to all its children generating a tree, it then starts
                        walking up:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>TreeViewItem GetTreeFromNode(DependencyObject node)
{
    TreeViewItem nodeAndChildren = GetVisualTree(node, true);
    var parent = GetParent(node);
    var child = nodeAndChildren;
    TreeViewItem parentNode = null;
    while (parent != null)
    {
        parentNode = new TreeViewItem();
        parentNode.Header = GetNodeLabel(parent);
        parentNode.Items.Add(child);
        child = parentNode;
        parent = GetParent(parent);
    }
    return parentNode;
}</code></pre>
                        <figcaption>Fig 07-005</figcaption>
                    </figure>
                    <p>So it has another Helper method down below called GetParent:</p>
                    <figure>
                <pre class="prettyprint"><code>DependencyObject GetParent(DependencyObject depObj)
{
    FrameworkElement element = depObj as FrameworkElement;
    if (element != null &amp;&amp; element.Parent != null) return element.Parent;
    else return VisualTreeHelper.GetParent(depObj);
}</code></pre>
                        <figcaption>Fig 07-006</figcaption>
                    </figure>
                    <p>That will get the ParentElement of the current node and then it uses that in a loop to walk up the
                        tree and get each one of the parents until you get to the root of the visual tree.
                    </p>
                    <p>The TreeViewItem that comes out of this can be passed this helper called ShowTree:</p>
                    <figure>
                <pre class="prettyprint"><code>void ShowTree(TreeViewItem tree)
{
    Window popup = new Window();
    TreeView treeView = new TreeView();
    treeView.Items.Add(tree);
    popup.Content = treeView;
    popup.Width = 700;
    popup.Height = 300;
    popup.FontSize = 16;
    popup.Show();
}</code></pre>
                        <figcaption>Fig 07-007</figcaption>
                    </figure>
                    <p>That's going to basically create a TreeView, put that root node into it, and pop it up in a window.
                        So we're going to use this as a crude visualization of the visual tree and the elements that we're
                        working with.
                    </p>
                    <p>So to get started, let's go over to our UI and I'm just going to drag out a simple TextBox:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid.RowDefinitions&gt;
    &lt;RowDefinition Height=&quot;139*&quot;/&gt;
    &lt;RowDefinition Height=&quot;90*&quot;/&gt;
    &lt;RowDefinition Height=&quot;90*&quot;/&gt;
&lt;/Grid.RowDefinitions&gt;
&lt;TextBox x:Name=&quot;TextBox1&quot; HorizontalAlignment=&quot;Left&quot;
         Height=&quot;23&quot;
         Margin=&quot;193,61,0,0&quot;
         TextWrapping=&quot;Wrap&quot;
         Text=&quot;TextBox&quot;
         VerticalAlignment=&quot;Top&quot;
         Width=&quot;120&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-008</figcaption>
                    </figure>
                    <p>seemingly simple control, and we will give it a name of TextBox1. I could then drop into my
                        code-behind and use my Helper methods to visualize the visual tree from that node. So I'm going to
                        go in here and say, ShowTree(GetTreeFromNode(TextBox1)):
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void Window_Loaded(object sender, RoutedEventArgs e)
{
    CollectionViewSource productViewSource =
        ((CollectionViewSource)(this.FindResource(&quot;productViewSource&quot;)));
    using (ZzaDbContext context = new ZzaDbContext())
    {
        productViewSource.Source = context.Products.ToList();
    }

    //ShowTree(GetTreeFromNode(productListBox));

}</code></pre>
                        <figcaption>Fig 07-009</figcaption>
                    </figure>
                    <p>If we go ahead and run, we can see the TextBox loads up there and we've got our visual tree here,
                        starting at the root, which is the window, down through the Grid that's its child. There's our
                        TextBox, then notice that the TextBox itself contains a Border, ScrollViewer, Grid, Rectangle,
                        ScrollContentPresenter, TextBoxViews, and blah, blah, blah.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-010.png" class="image"/>
                        <figcaption>Fig 07-010</figcaption>
                    </figure>
                    <p>So the point is, any given element within WPF that you declare at design time, can have some complex
                        structure generated at runtime based on that declaration.
                    </p>
                    <p>In this case, what you're seeing is the default ControlTemplate for a TextBox, so this stuff is not
                        so much being generated dynamically based on data, it's just part of the internal structure of a
                        TextBox. Any control in WPF is going to have some amount of that, but what we're going to focus on
                        next is the dynamic generation of elements based on data.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Dynamic Data Control Visual Tree</h3>
                    <p>So instead of that, if I replace my TextBox with a ContentControl:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid DataContext=&quot;{StaticResource productViewSource}&quot;&gt;
    &lt;Grid.RowDefinitions&gt;
        &lt;RowDefinition Height=&quot;139*&quot;/&gt;
        &lt;RowDefinition Height=&quot;90*&quot;/&gt;
        &lt;RowDefinition Height=&quot;90*&quot;/&gt;
    &lt;/Grid.RowDefinitions&gt;
    &lt;ContentControl x:Name=&quot;productContentControl&quot;
                    Grid.Row=&quot;2&quot;
                    Content=&quot;{Binding}&quot;&gt;
    &lt;/ContentControl&gt;</code></pre>
                        <figcaption>Fig 07-011</figcaption>
                    </figure>
                    <p>and we just use a binding that takes in whatever the current DataContext is, which is going to be the
                        collection coming out of this CollectionViewSource.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
    &lt;CollectionViewSource x:Key=&quot;productViewSource&quot; d:DesignSource=&quot;{d:DesignInstance {x:Type Data:Product}, CreateList=True}&quot;/&gt;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-012</figcaption>
                    </figure>
                    <p>If we then dump the tree on that ContentControl, and run, now we can see something similar get down
                        to the Grid to the ContentControl, but notice this child element called ContentPresenter:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-013.png" class="image"/>
                        <figcaption>Fig 07-013</figcaption>
                    </figure>
                    <p>The DataContext on this, notice we're also dumping what the DataContext is at a given level so that
                        we can see where that switches in data-bound scenarios.
                    </p>
                    <p>The DataContext is null on the ContentPresenter because it doesn't have anything to render yet, and
                        we'll see that switch momentarily. But notice that the Collection View flows down to the
                        ContentControl and then the ContentControl is going to render out a ContentPresenter for whatever
                        it's trying to dynamically render we need to give it a template to be able to render.
                    </p>
                    <p>So how can we set the template of a ContentControl? Well we could use a number of different ways, but
                        I'm just going to set an explicit template setting the ContentTemplate property equal to an instance
                        of a DataTemplate containing a TextBlock:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ContentControl x:Name=&quot;productContentControl&quot;
                Grid.Row=&quot;2&quot;
                Content=&quot;{Binding}&quot;&gt;
    &lt;ContentControl.ContentTemplate&gt;
        &lt;DataTemplate&gt;
            &lt;TextBlock HorizontalAlignment=&quot;Left&quot;
                       Height=&quot;53&quot;
                       TextWrapping=&quot;Wrap&quot;
                       Text=&quot;{Binding Name}&quot;
                       VerticalAlignment=&quot;Top&quot;
                       Width=&quot;195&quot; /&gt;
        &lt;/DataTemplate&gt;
    &lt;/ContentControl.ContentTemplate&gt;
&lt;/ContentControl&gt;</code></pre>
                        <figcaption>Fig 07-014</figcaption>
                    </figure>
                    <p>That TextBlock is bound to the Name property of the product that's being rendered. And because of the
                        way ListViews work, that was covered in a previous module, even this binding is pointing to a whole
                        collection, ContentControl is going to render out the current item in that collection.
                    </p>
                    <p>So let's go ahead and run with that, and now we can see in the window behind there, Plain Cheese is
                        showing up:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-015.png" class="image"/>
                        <figcaption>Fig 07-015</figcaption>
                    </figure>
                    <p>That's because that's the current product name. If we drill down in the tree now, we can see we get
                        down to the ContentPresenter level:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-016.png" class="image"/>
                        <figcaption>Fig 07-016</figcaption>
                    </figure>
                    <p>and notice now it does have the DataContext is that ListCollectionView, but then immediately
                        underneath that it renders an instance of our TextBlock and that DataContext flows down to it.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-017.png" class="image"/>
                        <figcaption>Fig 07-017</figcaption>
                    </figure>
                    <p>But because the control is designed to work with a single object, it will pick the current object out
                        of that collection and bind against the Name property of that current object. So notice the
                        ContentPresenter's role here in a ContentControl, it is the thing that will render out the
                        DataTemplate inside of it.
                    </p>
                    <p>Now what if we go with a little more complicated control, such as a ListBox bound to the entire
                        collection?</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ListBox x:Name=&quot;productListBox&quot;
    ItemsSource=&quot;{Binding}&quot;
    Grid.Row=&quot;1&quot;&gt;
    DisplayMemberPath="Name"
&lt;/ListBox&gt;</code></pre>
                        <figcaption>Fig 07-018</figcaption>
                    </figure>
                    <p>And in this case, we've got DisplayMemberPath set to Name. If we add that and dump that in a tree
                        instead:</p>
                    <figure>
                        <pre class="prettyprint"><code>ShowTree(GetTreeFromNode(productListBox));</code></pre>
                        <figcaption>Fig 07-019</figcaption>
                    </figure>
                    <p>and go ahead and run, now we can see the dump here behind.</p>
                    <p>You can see the ListBox is populated. You can start drilling down. Here's our ListBox:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-020.png" class="image"/>
                        <figcaption>Fig 07-020</figcaption>
                    </figure>
                    <p>It's got some structure with Border, ScrollViewer, Grid, etc., eventually a ScrollContentPresenter,
                        and then notice ItemsPresenter.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-021.png" class="image"/>
                        <figcaption>Fig 07-021</figcaption>
                    </figure>
                    <p>So for a ContentControl it's a ContentPresenter, that renders out the dynamic item. In an
                        ItemsControl it's an ItemsPresenter that renders out the dynamic items (plural).
                    </p>
                    <p>But then notice we get down to a level called the VirtualizingStackPanel:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-022.png" class="image"/>
                        <figcaption>Fig 07-022</figcaption>
                    </figure>
                    <p>Which is the default presenter for a ListBox, and we can't drill down any deeper because the
                        individual items are being rendered out dynamically in a way that the VisualTreeHelper can't get to.
                    </p>
                    <p>So how can we get to those to visualize their structure? Well, if we go to our ListBox and add an
                        ItemTemplate to it and get rid of our DisplayMemberPath:
                    </p>
                    <figure>
                <pre class="prettyprint"><code> &lt;ListBox x:Name=&quot;productListBox&quot;
         ItemsSource=&quot;{Binding}&quot;
         Grid.Row=&quot;1&quot;&gt;
    &lt;ListBox.ItemTemplate&gt;
        &lt;DataTemplate&gt;
            &lt;TextBlock Text=&quot;{Binding Name}&quot;
                       Loaded=&quot;ListBoxTextBlock_Loaded&quot; /&gt;
        &lt;/DataTemplate&gt;
    &lt;/ListBox.ItemTemplate&gt;
&lt;/ListBox&gt;</code></pre>
                        <figcaption>Fig 07-023</figcaption>
                    </figure>
                    <p>this ItemTemplate just contains a TextBlock bound to the Name property of the product again, similar
                        to what the DisplayMemberPath was doing, but here we can now hook up a Loaded event that we can then
                        tap into the object that's raising that event, which will be the TextBlock down inside of the
                        ListBox, then we can walk the visual tree from there.
                    </p>
                    <p>So let's go hook up this Loaded event. So I'll jump into the code-behind and add the Loaded event
                        here:</p>
                    <figure>
                <pre class="prettyprint"><code>bool lbDumpDone = false;
private void ListBoxTextBlock_Loaded(object sender, RoutedEventArgs e)
{
    if (lbDumpDone) return;
    lbDumpDone = true;
    //ShowTree(GetTreeFromNode(sender as DependencyObject));
}</code></pre>
                        <figcaption>Fig 07-024</figcaption>
                    </figure>
                    <p>We only want this to fire once, not once for each item, so I've got a little guard condition here to
                        make sure it only executes once.
                    </p>
                    <p>And then we're going to do the ShowTree call for that sender object that's raising the event:</p>
                    <figure>
                        <pre class="prettyprint"><code>ShowTree(GetTreeFromNode(sender as DependencyObject));</code></pre>
                        <figcaption>Fig 07-025</figcaption>
                    </figure>
                    <p>which will be the individual TextBlock inside of the ListBox.</p>
                    <p>I'll comment out the other ShowTree:</p>
                    <figure>
                        <pre class="prettyprint"><code>//ShowTree(GetTreeFromNode(productListBox));</code></pre>
                        <figcaption>Fig 07-026</figcaption>
                    </figure>
                    <p>so we don't get two of them popping up, and let's run with that. Now we can expand down and we can
                        see we get down to the VirtualizingStackPanel level, but we're actually walking up to that level so
                        we're able to walk through it, and notice there's a ListBoxItem, and also notice the DataContext
                        switch at this point.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-027.png" class="image"/>
                        <figcaption>Fig 07-027</figcaption>
                    </figure>
                    <p>So the true container of an item in the ListBox is a ListBoxItem. If it's a ComboBox, it's a
                        ComboBoxItem; if it's a TabControl, it's a TabItem. So each control has its own item container that
                        it will render out, and that's really the point where it switches from the overall collection to an
                        individual object in that collection as far as the DataContext.
                    </p>
                    <p>That flows down the visual tree from there, and inside of that is a ContentPresenter:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-028.png" class="image"/>
                        <figcaption>Fig 07-028</figcaption>
                    </figure>
                    <p>because the ListBoxItem is effectively a ContentControl. Inside of the ContentPresenter, that's where
                        our DataTemplate renders.
                    </p>
                    <p>So you can see, now we're able to walk up the visual tree, basically, from that TextBlock in the
                        event handler, all the way up and see the internals of what's going on inside this
                        VirtualizingStackPanel, and it emphasizes that's the point where the DataContext switches.
                    </p>
                    <p>Now let's take an even more dynamic and complicated data-bound container, a DataGrid:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid x:Name=&quot;productDataGrid&quot;
                  RowDetailsVisibilityMode=&quot;VisibleWhenSelected&quot;
                  ItemsSource=&quot;{Binding}&quot;
                  EnableRowVirtualization=&quot;True&quot;
                  AutoGenerateColumns=&quot;False&quot;
                  Margin=&quot;0,0,0,8&quot;&gt;
            &lt;DataGrid.Columns&gt;
                &lt;DataGridTemplateColumn Header=&quot;Description&quot;&gt;
                    &lt;DataGridTemplateColumn.CellTemplate&gt;
                        &lt;DataTemplate&gt;
                            &lt;TextBlock Text=&quot;{Binding Description}&quot;
                                       Loaded=&quot;DataGridCell_Loaded&quot; /&gt;
                        &lt;/DataTemplate&gt;
                    &lt;/DataGridTemplateColumn.CellTemplate&gt;
                &lt;/DataGridTemplateColumn&gt;
                &lt;DataGridCheckBoxColumn x:Name=&quot;hasOptionsColumn&quot;
                                        Width=&quot;SizeToHeader&quot;
                                        Header=&quot;Has Options&quot;
                                        Binding=&quot;{Binding HasOptions}&quot; /&gt;
                &lt;DataGridTextColumn x:Name=&quot;idColumn&quot;
                                    Width=&quot;SizeToHeader&quot;
                                    Header=&quot;Id&quot;
                                    Binding=&quot;{Binding Id}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-029</figcaption>
                    </figure>
                    <p>A DataGrid is going to render out rows for each object in the collection. Those rows have composite
                        structure of their own. And similar to what I showed with the ListBox, if I just tried to drill down
                        from the DataGrid, I wouldn't be able to get past the Row level, the ItemsPresenter level.
                    </p>
                    <p>So I'm going to play a similar trick here, that I'm going to use a TemplatedColumn:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridTemplateColumn.CellTemplate&gt;
    &lt;DataTemplate&gt;
        &lt;TextBlock Text=&quot;{Binding Description}&quot;
                   Loaded=&quot;DataGridCell_Loaded&quot; /&gt;
    &lt;/DataTemplate&gt;
&lt;/DataGridTemplateColumn.CellTemplate&gt;</code></pre>
                        <figcaption>Fig 07-030</figcaption>
                    </figure>
                    <p>which we'll get into more details on later in the module, and provide a DataTemplate containing a
                        TextBlock bound to the Description field with a Loaded event hooked up on it.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;TextBlock Text=&quot;{Binding Description}&quot;
        Loaded=&quot;DataGridCell_Loaded&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-031</figcaption>
                    </figure>
                    <p>I can hook that Loaded event and do my tree walk from there, similar to what I just showed with the
                        ListBox.
                    </p>
                    <p>So let's drop into the code-behind, add that event handler, we'll do our ShowTree on the object
                        that's raising the Loaded event, which will be our TextBlock inside of a cell within the DataGrid,
                        and we've got our guard condition to make sure we only do it once.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>bool dgDumpDone = false;
private void DataGridCell_Loaded(object sender, RoutedEventArgs e)
{
    if (dgDumpDone) return;
    dgDumpDone = true;
    ShowTree(GetTreeFromNode(sender as DependencyObject));
}</code></pre>
                        <figcaption>Fig 07-032</figcaption>
                    </figure>
                    <p>Let's go ahead and run, and now we can see a DataGrid showing up there:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-033.png" class="image"/>
                        <figcaption>Fig 07-033</figcaption>
                    </figure>
                    <p>We can drill our way down. Notice the ItemsPresenter in this case is a DataGridRowsPresenter:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-034.png" class="image"/>
                        <figcaption>Fig 07-034</figcaption>
                    </figure>
                    <p>and this is the level where we wouldn't be able to drill down any farther if we hadn't hooked the
                        event down inside of a DataTemplate, but we're really drilling up to that point, so you can see that
                        renders out DataGridRows as the containers.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-035.png" class="image"/>
                        <figcaption>Fig 07-035</figcaption>
                    </figure>
                    <p>Those have some structure to them. Eventually you get to a DataGridCellsPresenter, which contains an
                        ItemsPresenter itself.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-036.png" class="image"/>
                        <figcaption>Fig 07-036</figcaption>
                    </figure>
                    <p>So you've actually got ItemsControl behavior at a Row level:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-037.png" class="image"/>
                        <figcaption>Fig 07-037</figcaption>
                    </figure>
                    <p>but then within a Row, you've got ItemsControl rendering of the individual cells within the Row.</p>
                    <p>Notice in terms of DataContext switching, the Context switch happens at a Row level:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-038.png" class="image"/>
                        <figcaption>Fig 07-038</figcaption>
                    </figure>
                    <p>The entire Row's DataContext is the Product, and from there down.</p>
                    <p>Inside of the Cells, we've got a DataGridCellsPanel, eventually a DataGridCell is the container for a
                        single cell. There's our ContentPresenter again, the thing that's going to render out our
                        DataContext for that cell.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-039.png" class="image"/>
                        <figcaption>Fig 07-039</figcaption>
                    </figure>
                    <p>The other thing to note here, that we'll talk about more in the DataGrid section of this module,
                        notice there's no Column objects anywhere here. Columns don't really exist in terms of the object
                        model of a DataGrid at runtime. They're explicitly part of the way you declare the DataGrid at
                        design time, but the rendering actually happens at a Row level and then walking across the cells of
                        a row, not in a column-oriented fashion.
                    </p>
                    <p>And this really emphasizes the pivotal role of the ItemsPresenter here and here:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-040.png" class="image"/>
                        <figcaption>Fig 07-040</figcaption>
                    </figure>
                    <p>And the ContentPresenter here:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-041.png" class="image"/>
                        <figcaption>Fig 07-041</figcaption>
                    </figure>
                    <p>for dynamically rendering out the data-driven content of a data-bound control.</p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Visual Tree Tools - Mole and WPF Inspector</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-003" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\ContentAndItemsControls\ContentAndItemsControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-003">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-004" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\ContentAndItemsControls\ContentAndItemsControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-004">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>Now the other thing I wanted to point out is there are some tools out there that can help you with
                        all this data visualization and visual tree inspection. You don't necessarily have to write these
                        tree dumpers in your code yourself. The first is one called Mole for Visual Studio:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-042.png" class="image"/>
                        <figcaption>Fig 07-042</figcaption>
                    </figure>
                    <p>and this is a debugging visualizer that plugs into either Visual Studio 2013 or 2012 or prior. The
                        other is a tool called WPF Inspector:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-043.png" class="image"/>
                        <figcaption>Fig 07-043</figcaption>
                    </figure>
                    <p>which you can find out on CodePlex.</p>
                    <p>And there's a new XAML -Inspector coming that will work with other XAML technologies in a similar
                        way. I've got both of these available here, so let me start up the app that I put together in the
                        previous demo, and we're hitting a breakpoint for a DataGridCell_Loaded that's being triggered from
                        a template down inside of the DataGrid.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>bool dgDumpDone = false;
private void DataGridCell_Loaded(object sender, RoutedEventArgs e)
{
    if (dgDumpDone) return;
    dgDumpDone = true;
    ShowTree(GetTreeFromNode(sender as DependencyObject));
}</code></pre>
                        <figcaption>Fig 07-044</figcaption>
                    </figure>
                    <p>Now when you use Mole, it's a debugger visualizer, which means you can walk up to an object in your
                        environment, go to this little magnifying glass drop it down, and you can see Mole 2012.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-045.png" class="image"/>
                        <figcaption>Fig 07-045</figcaption>
                    </figure>
                    <p>I click on that, and it brings up the MoloScope:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-046.png" class="image"/>
                        <figcaption>Fig 07-046</figcaption>
                    </figure>
                    <p>So Mole gives you, over here on the left you can see, it's broken down the visual tree similar to
                        what I did in my demo:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-047.png" class="image"/>
                        <figcaption>Fig 07-047</figcaption>
                    </figure>
                    <p>So you've got this Visual Tree TreeView that you can drill through and see all the same kind of stuff
                        rendered out a little nicer than what I was doing.
                    </p>
                    <p> Also, anything you select in here over on the right, you're able to see all of the properties of
                        that object, inspect them, and even edit some of them:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-048.png" class="image"/>
                        <figcaption>Fig 07-048</figcaption>
                    </figure>
                    <p>So if you want to tweak with styling and things like that, you can do that in here and see what it's
                        going to look like.
                    </p>
                    <p>And if you select a given item up above, you can go down here on the bottom left, click to refresh,
                        it's going to show you what the XAML would look like for that single thing
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-049.png" class="image"/>
                        <figcaption>Fig 07-049</figcaption>
                    </figure>
                    <p>and you can go into Snapshot and it will render out just that single item.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-050.png" class="image"/>
                        <figcaption>Fig 07-050</figcaption>
                    </figure>
                    <p>So here we can see we're seeing just a Description cell that would be within the DataGrid. So in
                        terms of being able to walk up to any element in a running application and start inspecting and
                        tweaking it, Mole is very nice for that.
                    </p>
                    <p>The other tool that's very handy here is WPF Inspector. So if I go start up WPF Inspector, and you do
                        have to run this as an administrator, that's an important trick, because it has to have the process
                        rights to be able to go and inspect another process:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-051.png" class="image"/>
                        <figcaption>Fig 07-051</figcaption>
                    </figure>
                    <p>So notice it shows MainWindow here, that's my running MainWindow. I can attach to that, and it brings
                        up this window that's kind of laid out similar to what Mole had:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-052.png" class="image"/>
                        <figcaption>Fig 07-052</figcaption>
                    </figure>
                    <p>You can see we can start drilling down in the visual tree.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-053.png" class="image"/>
                        <figcaption>Fig 07-053</figcaption>
                    </figure>
                    <p>Now in this case I'm drilling down from the top down and we can see I can drill into something like
                        my ListBox and this will let me drill down through that ItemsPresenter and VirtualizingStackPanel,
                        and now I can see the ListBoxItems rendered out.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-054.png" class="image"/>
                        <figcaption>Fig 07-054</figcaption>
                    </figure>
                    <p>So I don't have to hook those lower-level events with WPF Inspector to drill all the way down the
                        visual tree. This, you can see if you hover over an item, gives you a rendering of what that item
                        looks like in the overall context
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-055.png" class="image"/>
                        <figcaption>Fig 07-055</figcaption>
                    </figure>
                    <p>and the other thing that's going on here, it's hard to see with the small screen here, but notice as
                        I make selections in WPF Inspector, it's actually putting a red box around them in the running UI
                        with some measurements.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-056.png" class="image"/>
                        <figcaption>Fig 07-056</figcaption>
                    </figure>
                    <p>Over on the right, similar to Mole, it has the property values so you can inspect those for the
                        currently selected item:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-057.png" class="image"/>
                        <figcaption>Fig 07-057</figcaption>
                    </figure>
                    <p>and you can do other things with it inspecting the DataContext that's there:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-058.png" class="image"/>
                        <figcaption>Fig 07-59</figcaption>
                    </figure>
                    <p>even tweaking the values to see what it would look like in the UI. So we could go tweak the name of
                        an item here:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-059.png" class="image"/>
                        <figcaption>Fig 07-059</figcaption>
                    </figure>
                    <p>and tab out of there, minimize this, and we can see it actually dynamically changed it in the running
                        UI.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-060.png" class="image"/>
                        <figcaption>Fig 07-060</figcaption>
                    </figure>
                    <p>So very handy tool to be aware of for digging into your visual tree, seeing what's there,
                        understanding what's there, and playing with values in it.
                    </p>
                    <p>So both Mole and WPF Inspector are very handy tools to have in your arsenal to be able to drill in
                        and inspect your visual tree, visualize things, and make tweaks to them.
                    </p>
                    <p>And in the context of these demos, for really understanding what's being dynamically generated at an
                        ItemsPresenter and ContentPresenter level, and what the DataContexts are, to make sure your data
                        binding is working out the way you expect it to.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>ComboBoxes and ListBoxes</h3>
                    <p>ComboBoxes and ListBoxes are a mainstay of data-bound scenarios, so let's review the key properties
                        you're going to want to have at the tip of your fingers every time you go to do data binding with
                        these.
                    </p>
                    <p>First off, they both derive from ItemsControl, so all the concepts around ItemsControls and
                        ItemsPresenters and things we've been talking about so far, apply. The data binding properties that
                        are going to be most important to you include, first and foremost the ItemsSource. This is the one
                        you're going to set to a collection that's going to render out the individual items within the
                        ComboBox or ListBox.
                    </p>
                    <p>Next, if you want to keep it simple, you can use the DisplayMemberPath property. DisplayMemberPath is
                        going to be the name of a property on each data-bound object that you want turned into a string and
                        rendered as a string within the ComboBox or ListBox. If you need to start using the SelectedItem,
                        then you're going to have some value that you want to associate with it, so SelectedValuePath lets
                        you point to a different property, or possibly the same property, on each data-bound object to
                        identify the value of each item. Typically, this is going to be an Id-like property, something like
                        a primary key type property that you can use to go and retrieve the whole object from a database or
                        to transmit that Id around as a unique identifier for a particular object.
                    </p>
                    <p>Hand-in-hand with SelectedValuePath is the SelectedValue property. This is the thing you can inspect
                        when the user is interacting with the control to see what the value of that property indicated by
                        SelectedValuePath is, on the currently selected object.
                    </p>
                    <p>Next, if you want to deal with the whole selected object, then you can use SelectedItem. This is
                        going to pass a reference to the entire selected object to whoever calls it. And both SelectedValue
                        and SelectedItem become good candidates for data binding to push the SelectedValue or SelectedItem
                        through a binding in a two-way data binding fashion to some property either in your code-behind or
                        in something like a ViewModel that logic is then later going to act on based on what's selected.
                    </p>
                    <p>As we saw in a previous module, if you want to start driving the visual appearance of each item with
                        something more than just a string, then you can provide an ItemTemplate, and that ItemTemplate is a
                        DataTemplate to render out each item with whatever visual structure you want, containing embedded
                        bindings to the properties of the current item.
                    </p>
                    <p>Now there's one other property on a ListBox to be aware of, called SelectedItems, because ListBoxes
                        support multi-select scenarios. The problem with SelectedItems is, it's not a good candidate for
                        data binding. It's a read-only property, so you can't set it through a data binding.
                    </p>
                    <p>Now there is kind of an advanced way you can deal with this if you've been exposed to the concept of
                        behaviors, either attach behaviors or blend behaviors, these are extensibility points you can write
                        and embed in your XAML.
                    </p>
                    <p>You could write a custom behavior that monitors the SelectionChanged event of the ItemsControl, reads
                        the values from SelectedItems, and then pushes those values as a collection through some property
                        that the behavior exposes through a binding, but doing that goes a little bit beyond the scope of
                        this course.
                    </p>
                    <p>So let's dive into a demo that reviews all of these important properties and how to use them in
                        ComboBoxes and ListBoxes.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: ComboBoxes and ListBoxes</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-005" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\ComboAndListBoxes\ComboAndListBoxes.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-005">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-006" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\ComboAndListBoxes\ComboAndListBoxes.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-006">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>In this demo, I want to walk you through the basics of ComboBoxes and ListBoxes. We've seen these in
                        a number of demos before, but I didn't really spend time focusing on each of the data-bound
                        properties and how they relate to one another, so I just wanted to revisit them comprehensively
                        since they're such a pivotal data-bound control.
                    </p>
                    <p>Starting point for this demo is a simple WPF application project with a MainWindow in it:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-061.png" class="image"/>
                        <figcaption>Fig 07-061</figcaption>
                    </figure>
                    <p>and I added a MainWindowViewModel. In the MainWindowViewModel constructor, we're doing some data
                        retrieval:</p>
                    <figure>
                <pre class="prettyprint"><code>public MainWindowViewModel()
{
    if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
    {
        using (ZzaDbContext context = new ZzaDbContext())
        {
            var products = new ObservableCollection&lt;Product&gt;(context.Products);
            products.ToList().ForEach(p =&gt; p.Image = &quot;Images/&quot; + p.Image);
            SelectedProductId = products[0].Id;
            SelectedProduct = products[0];
            Products = products;
        }
    }
}</code></pre>
                        <figcaption>Fig 07-062</figcaption>
                    </figure>
                    <p>As usual, we're using our ZzaDBContext to go out to a Zza database, we're getting some products and
                        pushing them into an ObservableCollection.
                    </p>
                    <p>That collection is exposed as a property called Products on our ViewModel that we can data bind
                        to:</p>
                    <figure>
                <pre class="prettyprint"><code>public ObservableCollection&lt;Product&gt; Products
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
}</code></pre>
                        <figcaption>Fig 07-063</figcaption>
                    </figure>
                    <p>We're also modifying the Image property of each product to point to a collection of Images that's in
                        our project under the Images subfolder.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-064.png" class="image"/>
                        <figcaption>Fig 07-064</figcaption>
                    </figure>
                    <p>And we're setting two other properties on initialization here, the SelectedProductId and
                        SelectedProduct, which are both exposed as properties on our ViewModel here.
                    </p>
                    <p>So this just gives us a good DataContext to data bind against for our ComboBoxes and ListBoxes. We
                        also have a RelayCommand in the project, which we've seen in previous demos:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public class RelayCommand : ICommand
{
    Action _TargetExecuteMethod;
    Func&lt;bool&gt; _TargetCanExecuteMethod;

    public RelayCommand(Action executeMethod)
    {
        _TargetExecuteMethod = executeMethod;
    }

    public RelayCommand(Action executeMethod, Func&lt;bool&gt; canExecuteMethod)
    {
        _TargetExecuteMethod = executeMethod;
        _TargetCanExecuteMethod = canExecuteMethod;
    }</code></pre>
                        <figcaption>Fig 07-065</figcaption>
                    </figure>
                    <p>just an ICommand object we can use to hook up buttons to point to handling in our ViewModel, which
                        we'll get to.
                    </p>
                    <p>So if I drop into my MainWindow and add a basic ComboBox here, the basic structure is that it is an
                        ItemsControl
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
        &lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
                  HorizontalAlignment=&quot;Left&quot;
                  Margin=&quot;44,23,0,0&quot;
                  VerticalAlignment=&quot;Top&quot;
                  Width=&quot;120&quot; /&gt;
&lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-066</figcaption>
                    </figure>
                    <p>so the most important property that you're going to want to set in data binding is the ItemsSource
                        property.
                    </p>
                    <p>Here we're pointing to a Products path on whatever our DataContext is, and you can see up above our
                        DataContext is already wired up so that our MainWindowViewModel is our DataContext:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.DataContext&gt;
    &lt;local:MainWindowViewModel /&gt;
&lt;/Window.DataContext&gt;</code></pre>
                        <figcaption>Fig 07-067</figcaption>
                    </figure>
                    <p>So this will cause it to be constructed, the constructor fires and loads the products, and then data
                        binding fires and reads those products into our ComboBox.
                    </p>
                    <p>If that's all we put on our ComboBox and try to run, as we've seen before, that's not quite enough,
                        because it's just going to ToString each of the Product objects and that's not really what we want:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-068.png" class="image"/>
                        <figcaption>Fig 07-068</figcaption>
                    </figure>
                    <p>So at a bare minimum, when using a ComboBox, you're going to want to set the DisplayMemberPath
                        property and I'll set that to Name.
                    </p>
                    <figure>
<pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
    DisplayMemberPath=&quot;Name&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;44,23,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;120&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-069</figcaption>
                    </figure>
                    <p>That basically says, go to the Name property on each of those products, get that out as a string, and
                        then it's going to render a TextBlock, basically, inside of the ComboBox list for each one of those.
                    </p>
                    <p>So running with that, now we get something a little more like what we expect.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-070.png" class="image"/>
                        <figcaption>Fig 07-070</figcaption>
                    </figure>
                    <p>Now we see the names of each of the products in our ComboBox. Notice that it started with nothing
                        selected, and that's where some of the other data-bound properties can come in. Another one, if
                        you're using DisplayMemberPath, that you'll often use, is SelectedValuePath.
                    </p>
                    <p>SelectedValuePath lets you point to another property on each one of your data-bound objects that
                        contains some sort of identifier typically. So in our case, we can use the Id property.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
    DisplayMemberPath=&quot;Name&quot;
    SelectedValuePath=&quot;Id&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;44,23,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;120&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-071</figcaption>
                    </figure>
                    <p>Hand-in-hand with the SelectedValuePath is the SelectedValue property, and this is one that you can
                        programmatically inspect based on events.
                    </p>
                    <p>If you were to hook the SelectionChanged event, for example, you could then get the SelectedValue or
                        the SelectedIndex or the SelectedItem, but in a data-bound scenario you might push this value
                        through data binding into some property, especially in a ViewModel type scenario.
                    </p>
                    <p>So we could set up a binding on this and point it to our SelectedProductId property on our ViewModel,
                        like so.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>ComboBox ItemsSource=&quot;{Binding Products}&quot;
                  DisplayMemberPath=&quot;Name&quot;
                  SelectedValuePath=&quot;Id&quot;
                  SelectedValue=&quot;{Binding SelectedProductId}&quot;</code></pre>
                        <figcaption>Fig 07-072</figcaption>
                    </figure>
                    <p>Now, if we go ahead and run, notice that the ComboBox is not empty initially:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-073.png" class="image"/>
                        <figcaption>Fig 07-073</figcaption>
                    </figure>
                    <p>and that's because of our initialization code back here in the ViewModel. Remember we loaded up the
                        products, but we also initialized the SelectedProductId property to the first item in those
                        products.
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>SelectedProductId = products[0].Id;</code></pre>
                        <figcaption>Fig 07-074</figcaption>
                    </figure>
                    <p>Another one you could do as an alternative to SelectedValue, you generally won't do both of these, is
                        the SelectedItem property:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>SelectedItem=&quot;{Binding SelectedProduct}&quot;</code></pre>
                        <figcaption>Fig 07-075</figcaption>
                    </figure>
                    <p>SelectedItem gets the whole data-bound object, which will be a Product object in this case, and
                        pushes it through a binding to a property in our ViewModel in this case.
                    </p>
                    <p>That, likewise, was being initialized in the constructor to the first item in the list:</p>
                    <figure>
                        <pre class="prettyprint"><code>SelectedProduct = products[0];</code></pre>
                        <figcaption>Fig 07-076</figcaption>
                    </figure>
                    <p>So we should see that selected now when it starts up. And we could go back here into our
                        SelectedProduct setter, set a breakpoint, and see whenever it's set, our set block is being called,
                        so we have an opportunity to invoke some logic there based on the product that's being selected.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-077.png" class="image"/>
                        <figcaption>Fig 07-077</figcaption>
                    </figure>
                    <p>If we want to have more structure to the elements within our ComboBox, we could use a
                        DataTemplate:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type data:Product}&quot;&gt;
        &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
            &lt;Image Source=&quot;{Binding Image}&quot;
                   Width=&quot;75&quot; /&gt;
            &lt;TextBlock Margin=&quot;5&quot;
                       Text=&quot;{Binding Name}&quot; /&gt;
        &lt;/StackPanel&gt;
    &lt;/DataTemplate&gt;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-078</figcaption>
                    </figure>
                    <p>in this case, an ImplicitDatatemplate, but of course, an explicit one would work as well. This
                        DataTemplate is mapped to the Product Type and it uses the Image property to render out an Image and
                        a TextBlock to render out the Name. With that in place, it would do nothing if we don't get rid of
                        the DisplayMemberPath property:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
    DisplayMemberPath=&quot;Name&quot;</code></pre>
                        <figcaption>Fig 07-079</figcaption>
                    </figure>
                    <p>because those two are incompatible.</p>
                    <p>When you say DisplayMemberPath, you're saying you just want to render out text based on that
                        property, so we can get rid of both DisplayMemberPath and SelectedValuePath:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>DisplayMemberPath=&quot;Name&quot;
SelectedValuePath=&quot;Id&quot;</code></pre>
                        <figcaption>Fig 07-080</figcaption>
                    </figure>
                    <p>which is not being used anymore, and go ahead and run this.</p>
                    <p>And now we can see that the individual items in our ComboBox have the structure that we determined in
                        our DataTemplate:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-081.png" class="image"/>
                        <figcaption>Fig 07-081</figcaption>
                    </figure>
                    <p>and obviously we'd want to do some sizing on the ComboBox itself so we could show a whole item when
                        selected. So those are the primary things you're going to use on a ComboBox.
                    </p>
                    <p>Always an ItemsSource when you're data binding, DisplayMemberPath and SelectedValuePath if you're
                        just dealing with simple text rendering, and the SelectedValue property to do something with it or
                        the SelectedItem property to push the whole object when selected, and then to put more structure on
                        the rendering, use DataTemplates.
                    </p>
                    <p>All those same concepts apply to a ListBox. I could go in here and add a ListBox bound to Products
                        here.</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ListBox ItemsSource=&quot;{Binding Products}&quot;
     HorizontalAlignment=&quot;Left&quot;
     Height=&quot;132&quot;
     Margin=&quot;44,72,0,0&quot;
     VerticalAlignment=&quot;Top&quot;
     Width=&quot;246&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-082</figcaption>
                    </figure>
                    <p>DisplayMemberPath would, again, apply, as would SelectedItem, SelectedValue, SelectedValuePath, and
                        so on.</p>
                    <p>I'm going to go ahead and run here with both the ComboBox and ListBox bound to Products to emphasize
                        something about synchronization.
                    </p>
                    <p>So right now, notice I can make a selection in the ListBox and it has no impact on the ComboBox, and
                        vice-versa.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-083.png" class="image"/>
                        <figcaption>Fig 07-083</figcaption>
                    </figure>
                    <p>When you have two data-bound controls pointing to the same collection by default, there is a
                        CollectionViewSource associated with them, but they are not synchronized with that current item in
                        the CollectionViewSource.
                    </p>
                    <p>If you have two things like that and you want them to stay in synch, this is where the
                        IsSynchronizedWithCurrentItem property comes in. Go ahead and set that to True on both of these
                        items:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
    SelectedItem=&quot;{Binding SelectedProduct}&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;44,23,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;120&quot; IsSynchronizedWithCurrentItem=&quot;True&quot;/&gt;

&lt;ListBox ItemsSource=&quot;{Binding Products}&quot;
         DisplayMemberPath=&quot;Name&quot;
         HorizontalAlignment=&quot;Left&quot;
         Height=&quot;132&quot;
         Margin=&quot;44,72,0,0&quot;
         VerticalAlignment=&quot;Top&quot;
         Width=&quot;246&quot; IsSynchronizedWithCurrentItem=&quot;True&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-084</figcaption>
                    </figure>
                    <p>and run again, and now we can see if I select Holy Smokes up above, it's highlighted in the list
                        below, Italian Stallion down below, it's selected up above.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-085.png" class="image"/>
                        <figcaption>Fig 07-085</figcaption>
                    </figure>
                    <p>Now another thing you might sometimes want to do is have some other UI that is driving the selection
                        in a ComboBox, ListBox or DataGrid. So here I'm going to add a simple little Search UI:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-086.png" class="image"/>
                        <figcaption>Fig 07-086</figcaption>
                    </figure>
                    <p>a TextBox and a button that we can trigger. The TextBox is going to be bound to a property on our
                        ViewModel called SearchInput:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;TextBox Text=&quot;{Binding SearchInput}&quot;
     HorizontalAlignment=&quot;Left&quot;
     Height=&quot;23&quot;
     Margin=&quot;183,23,0,0&quot;
     TextWrapping=&quot;Wrap&quot;
     VerticalAlignment=&quot;Top&quot;
     Width=&quot;120&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-087</figcaption>
                    </figure>
                    <p>and the button is bound to a command that we're going to add.</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Button Command=&quot;{Binding SetProductCommand}&quot;
    Content=&quot;Search&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;322,26,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;75&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-088</figcaption>
                    </figure>
                    <p>So first let me drop back to the ViewModel and add those two properties. So here's our SearchInput as
                        a string input:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public string SearchInput
{
    get
    {
        return _SearchInput;
    }
    set
    {
        if (value != _SearchInput)
        {
            _SearchInput = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;SearchInput&quot;));
        }
    }
}</code></pre>
                        <figcaption>Fig 07-089</figcaption>
                    </figure>
                    <p>and here's our SetProductCommand as a RelayCommand.</p>
                    <figure>

                        <pre class="prettyprint"><code>public RelayCommand SetProductCommand { get; private set; }</code></pre>
                        <figcaption>Fig 07-090</figcaption>
                    </figure>
                    <p>Now we need to initialize that ProductCommand, so in the constructor up here, we can initialize it
                        and point it to a method called OnSetProduct:
                    </p>
                    <figure>
                <pre class="prettyprint"><code> public MainWindowViewModel()
{
    SetProductCommand = new RelayCommand(OnSetProduct);</code></pre>
                        <figcaption>Fig 07-091</figcaption>
                    </figure>
                    <p>and I can declare that method down below here.</p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSetProduct()
{
    SelectedProduct = Products.FirstOrDefault(p =&gt; p.Name.Contains(SearchInput));
}</code></pre>
                        <figcaption>Fig 07-092</figcaption>
                    </figure>
                    <p>And you can see when that gets called through the command, I'm going to go out and use the
                        SearchInput text, which was pushed through thanks to two-way data binding, when I click on the
                        button, changes focus, that causes the current value in the TextBox to be pushed down into that
                        SearchInput and that makes it available to do a Search here against our Products based on the Name
                        property, and then we will push that into the SelectedProduct property.
                    </p>
                    <p>That's going to call the setter</p>
                    <figure>
                <pre><code class="">public Product SelectedProduct
{
    get
    {
        return _SelectedProduct;
    }
    set
    {
        if (value != _SelectedProduct)
        {
            _SelectedProduct = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;SelectedProduct&quot;));
        }
    }
}</code></pre>
                        <figcaption>Fig 07-093</figcaption>
                    </figure>
                    <p>which raises a PropertyChanged event, and because our SelectedItem is bound to that
                        SelectedProduct:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding Products}&quot;
                  SelectedItem=&quot;{Binding SelectedProduct}&quot;</code></pre>
                        <figcaption>Fig 07-094</figcaption>
                    </figure>
                    <p>that's going to cause the ComboBox to change. Because the ComboBox changes and IsSynchronized is set
                        on both of these, it will also cause the ListBox to change. So let's go ahead and run with that, and
                        we can see down below there's a product called Taj Mahal. If I just put in Taj and Search:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-095.png" class="image"/>
                        <figcaption>Fig 07-095</figcaption>
                    </figure>
                    <p>You can see it's selected up above and selected down below. Put in Smokes, Search, Holy Smokes
                        selected in both controls.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-096.png" class="image"/>
                        <figcaption>Fig 07-096</figcaption>
                    </figure>
                    <p>So that just further emphasizes the way you can bind SelectedItem, for example, or SelectedValue,
                        change the thing it's bound to in the code-behind, and that will drive what's selected in the UI, a
                        very common thing to do in Model-View-ViewModel data binding scenarios.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>TabControl Data Binding</h3>
                    <p>TabControls are probably not something you think about first and foremost as a data-bound control,
                        because they're often used for structurally setting up some static content in child views within a
                        window.
                    </p>
                    <p>But TabControls are also good for dynamic view containment scenarios, when the set of child views
                        that you want to present is dynamically driven by data. To support this, a TabControl is derived
                        from ItemsControl so each of the tabs is an item that is rendered out, similar to ListBox items in a
                        ListBox.
                    </p>
                    <p>But each TabItem that gets rendered out is really a composite object itself. It contains two pieces
                        of content, and in fact, they're implemented as two separate ContentControls.
                    </p>
                    <p> First off, there is the header. That's what shows up in the little tab at the top, which can,
                        naturally, be put on the sides or bottom if you need to. Then there's the actual client area of the
                        tab, the main part of the tab, if you will, and that's called Content.
                    </p>
                    <p>To drive these dynamically, there's two DataTemplates associated with a TabControl. The ItemTemplate
                        actually applies to the header of each TabItem, and then there's a separate ContentTemplate that
                        applies to the Content of each TabItem.
                    </p>
                    <p>So let's take a look at a demo of how we can use this to compose dynamic child views into a
                        containing main view using a TabControl, DataTemplates, and data binding.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: TabControl Data Bound Views</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-007" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\TabControls\TabControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-007">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-008" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\TabControls\TabControls.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-008">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>In this demo, I want to get you familiar with TabControls and how they can be used with data binding.
                        Starting point for this is a WPF project with a MainWindow and a MainWindowViewModel:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-097.png" class="image"/>
                        <figcaption>Fig 07-097</figcaption>
                    </figure>
                    <p>and then a ProductView, which is a UserControl in its own associated ViewModel.</p>
                    <p>The ViewModel for the ProductViewModel is just loading up products into a Products property on the
                        ViewModel:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public ProductViewModel(string type)
    {
        ProductType = type;
        if (!DesignerProperties.GetIsInDesignMode(new DependencyObject()))
        {
            using (ZzaDbContext context = new ZzaDbContext())
            {
                Products = new ObservableCollection&lt;Product&gt;(context.Products.Where(p =&gt; p.Type == type));
                Products.ToList().ForEach(p =&gt; p.Image = &quot;Images/&quot; + p.Image);
            }
        }
    }</code></pre>
                        <figcaption>Fig 07-098</figcaption>
                    </figure>
                    <p>Which can be rendered out in a list-oriented control. In addition, it has a ProductType string</p>
                    <figure>
                <pre class="prettyprint"><code>public string ProductType
{
    get
    {
        return _ProductType;
    }
    set
    {
        if (value != _ProductType)
        {
            _ProductType = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;ProductType&quot;));
        }
    }
}</code></pre>
                        <figcaption>Fig 07-099</figcaption>
                    </figure>
                    <p>That can be used to label what kind of products this view is rendering.</p>
                    <p>The view itself is just going to use a ListBox to render out those products:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;ListBox ItemsSource=&quot;{Binding Products}&quot;/&gt;

&lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-100</figcaption>
                    </figure>
                    <p>and notice that no DataContext is set inside the UserControl because it's going to be set dynamically
                        through data binding.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>mc:Ignorable=&quot;d&quot;
         d:DesignHeight=&quot;300&quot; d:DesignWidth=&quot;300&quot;&gt;
&lt;UserControl.Resources&gt;</code></pre>
                        <figcaption>Fig 07-101</figcaption>
                    </figure>
                    <p>The individual products are being rendered out using a DataTemplate:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataTemplate DataType=&quot;{x:Type data:Product}&quot;&gt;
    &lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
        &lt;Image Source=&quot;{Binding Image}&quot;
               Width=&quot;75&quot; /&gt;
        &lt;TextBlock Margin=&quot;5&quot;
                   Text=&quot;{Binding Name}&quot; /&gt;
    &lt;/StackPanel&gt;
&lt;/DataTemplate&gt;</code></pre>
                        <figcaption>Fig 07-102</figcaption>
                    </figure>
                    <p>specifically an ImplicitDataTemplate for the DataType Product.</p>
                    <p>The MainWindowViewModel, at this point, just has a property called ChildViewModels, which is a
                        collection of those ProductViewModels.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public ObservableCollection&lt;ProductViewModel&gt; ChildViewModels
{
    get
    {
        return _ChildViewModels;
    }
    set
    {
        if (value != _ChildViewModels)
        {
            _ChildViewModels = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;ChildViewModels&quot;));
        }
    }
}</code></pre>
                        <figcaption>Fig 07-103</figcaption>
                    </figure>

                    <p>So the scenario here is that we want to render out individual tabs in a TabControl for different
                        categories of products or ProductTypes. So using data binding, we're going to create a collection of
                        ChildViewModels here, one for each ProductType, and have data binding render out the appropriate
                        View and ViewModel in a tab for each one of those.
                    </p>
                    <p>To do that, we'll need a TabControl. So let's drop into the MainWindow and add a TabControl</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;TabControl ItemsSource=&quot;{Binding ChildViewModels}&quot; ItemTemplate=&quot;{StaticResource TabHeaderTemplate}&quot;/&gt;
&lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-104</figcaption>
                    </figure>
                    <p> bound to that ChildViewModel's property on its ViewModel, which is already wired up as the
                        DataContext. Next, we need to actually populate that ChildViewModels collection with something, so
                        I'm going to drop into the constructor of the ViewModel here and populate it with an
                        ObservableCollection.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public MainWindowViewModel()
{
    ChildViewModels = new ObservableCollection&lt;ProductViewModel&gt;
    {
        new ProductViewModel(&quot;pizza&quot;),
        new ProductViewModel(&quot;salad&quot;),
        new ProductViewModel(&quot;drink&quot;)
    };
}</code></pre>
                        <figcaption>Fig 07-105</figcaption>
                    </figure>
                    <p>We're putting one instance of the ProductViewModel in for each of the three ProductTypes that are in
                        our Products collection, pizza, salads, and drinks. ProductViewModel takes that Type that's passed
                        in and uses it to set the ProductType property:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public ProductViewModel(string type)
{
    ProductType = type;</code></pre>
                        <figcaption>Fig 07-106</figcaption>
                    </figure>
                    <p>and then notice it's filtering the products that it loads into that ViewModel, based on that
                        Type.</p>
                    <figure>
                        <pre class="prettyprint"><code>Products = new ObservableCollection&lt;Product&gt;(context.Products.Where(p =&gt; p.Type == type));</code></pre>
                        <figcaption>Fig 07-107</figcaption>
                    </figure>
                    <p>So now we have a TabControl, which is an ItemsControl itself, bound to a collection of items:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;TabControl ItemsSource=&quot;{Binding ChildViewModels}&quot; &quot;/&gt; &lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-108</figcaption>
                    </figure>
                    <p>but it needs to know how to render those items out, and it's going to do that with DataTemplates.</p>
                    <p>So we're going to go up here to our Resources section and add in a DataTemplate:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type local:ProductViewModel}&quot;&gt;
        &lt;local:ProductView/&gt;
    &lt;/DataTemplate&gt;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-109</figcaption>
                    </figure>

                    <p>an ImplicitDataTemplate, mapped to the ProductViewModel Type, which is going to be the individual
                        items that show up in this ChildViewModels collection.
                    </p>
                    <p>And similar to a demo in the DataTemplates module, the actual rendering for a ProductViewModel will
                        be its corresponding view, and its DataContext will be set to that instance of the ViewModel through
                        the magic of how DataTemplates work.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-110.png" class="image"/>
                        <figcaption>Fig 07-110</figcaption>
                    </figure>
                    <p>Now if we run at this point, we're going to see this strange-looking view:</p>
                    <p>where we actually have tabs here, you can see I can click on them and the appearance is changing, but
                        what's actually happening is that view is being rendered in the tab itself, the tab header, and we
                        don't have a scrolling container, so we can't see it, but it's actually rendering them again as the
                        content of the tab, not exactly what we wanted.
                    </p>
                    <p>The reason for this is, a TabControl is an ItemsControl</p>
                    <figure>
                        <pre class="prettyprint"><code>&lt;TabControl ItemsSource=&quot;{Binding ChildViewModels}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-111</figcaption>
                    </figure>
                    <p>but it's really a composite ItemsControl, it's going to render a TabItem for each of the items in its
                        data-bound source, but a TabItem itself has two parts to it, it has a header and it has content. The
                        header is a ContentControl and the Content is a ContentControl, and the DataContext for the TabItem
                        as a whole is the individual thing that's being rendered, in this case a ProductViewModel.
                    </p>
                    <p>So, the data binding in the content of the header binds to that, and the data binding in the content
                        of the main client area of the tab, also binds to that. So what we need to do here is control this a
                        little more explicitly.
                    </p>
                    <p>What I'll do is I'll drop into my Resources and add another DataTemplate.</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataTemplate x:Key=&quot;TabHeaderTemplate&quot;&gt;
    &lt;TextBlock Text=&quot;{Binding ProductType}&quot;/&gt;
&lt;/DataTemplate&gt;</code></pre>
                        <figcaption>Fig 07-112</figcaption>
                    </figure>
                    <p>This one's going to have a key to it so we can point to it explicitly and we'll call this the
                        TabHeaderTemplate. Here you can see we're just going to bind to ProductType because the overall
                        DataContext for the TabItem is still going to be the ViewModel and that's the property exposed from
                        it.
                    </p>
                    <p>Now we need to go down here to our TabControl and actually pull that template in by name. So we'll
                        set the ItemTemplate property through a StaticResource, pointing to that TabHeaderTemplate.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;TabControl ItemsSource=&quot;{Binding ChildViewModels}&quot;
        ItemTemplate=&quot;{StaticResource TabHeaderTemplate}&quot;/&gt;

&lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-113</figcaption>
                    </figure>
                    <p>Now, notice if we wanted to do the other one explicitly, we could do that, and what we would use is
                        the ContentTemplate property:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid&gt;
    &lt;TabControl ItemsSource=&quot;{Binding ChildViewModels}&quot;
        ItemTemplate=&quot;{StaticResource TabHeaderTemplate}&quot; ContentTemplate=&quot;&quot; /&gt;

&lt;/Grid&gt;</code></pre>
                        <figcaption>Fig 07-114</figcaption>
                    </figure>
                    <p>and point it to whatever template we want, but since we're using an ImplicitDataTemplate here we
                        don't have to do that one.
                    </p>
                    <p>That one can match up implicitly, but if you have an explicit one hooked up, it will ignore the
                        implicit ones. So with that fix in place, now we've got what we want.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-115.png" class="image"/>
                        <figcaption>Fig 07-115</figcaption>
                    </figure>
                    <p>We've got the TabHeaders are being set based on the ProductType property of our ViewModel, the Tab
                        content is being set to an instance of the ViewModel, which gets married up through the DataTemplate
                        to its view, and rendered out.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>DataGrid Features</h3>
                    <p>Now let's talk about the ubiquitous DataGrid. DataGrids are obviously a mainstay of data binding
                        scenarios and presenting data collections in tabular form.
                    </p>
                    <p>They are ItemsControls themselves, so all the things we've said about ItemsControls apply to them as
                        well. DataGrids are editable. They have an edit mode and a normal mode. When you click in a cell in
                        a row, it goes into edit mode and stays there until you click out of that row.
                    </p>
                    <p>DataGrids support dynamic column generation, so they can reflect on the data-bound objects and
                        generate a column for each property on that object, but most commonly you're going to use static
                        column definitions, setting up exactly what columns you want, in the order you want them, bound to
                        the properties you intend.
                    </p>
                    <p>You can also use templated columns, which we'll look into in more detail. Templating really comes in
                        at two different levels. For the column level, it really amounts to cell level. You define a
                        template column, and that's specifying the visual structure of each cell within that column.
                    </p>
                    <p>There are separate templates that you can set for normal versus edit mode, in case you want to
                        toggle, for example, render something as text when you're not in edit mode, and then switch to a
                        ComboBox when you are in edit mode.
                    </p>
                    <p>There's also a RowDetails template that you can provide on the DataGrid as a whole, and this lets you
                        provide a DataTemplate to render out the child detail for a given row in whatever way that you want.
                    </p>
                    <p>You could render out a data form, a child DataGrid or whatever makes sense for your scenario. An
                        important concept surrounding DataGrids and data binding is to realize that DataGrid columns are not
                        part of the visual tree.
                    </p>
                    <p>So earlier in this module we looked at the breakdown of the visual tree and the dynamic generation of
                        ItemsPresenters and ContentPresenters, and we saw that there are no columns rendered out as part of
                        that tree.
                    </p>
                    <p>On a DataGrid column, however, you will declare bindings. Those bindings are actually kind of held
                        aside and used at the point where it goes to render a cell. At the point where the binding is first
                        evaluated, it's when it's parsing the DataGrid and the columns contained within it.
                    </p>
                    <p>Since that column is not part of the visual tree, things like RelativeSource bindings and ElementName
                        bindings that try to walk throughout the tree to find the source object, are not going to work
                        properly as part of a column.
                    </p>
                    <p>In a demo, I'll show you how you can use templated columns to address that and still have the power
                        and flexibility you need to use RelativeSource or ElementName bindings when you want as part of a
                        column definition. So let's dive into a demo to get more familiar with all these aspects of
                        DataGrids.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: DataGrid Features</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-009" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\DataGrids\DataGrids.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-009">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-010" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\DataGrids\DataGrids.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-010">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>In this demo, I want to get you more familiar with some of the more detailed features of DataGrids.
                        Now DataGrids are a big topic. You could easily spend a whole module drilling into all kinds of
                        esoteric details about DataGrids. I just want to hit the high points here and the things you're
                        going to use most commonly in data binding scenarios.
                    </p>
                    <p>Our starting point here is a simple WPF project with a MainWindow:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-116.png" class="image"/>
                        <figcaption>Fig 07-116</figcaption>
                    </figure>
                    <p>and the only thing that's really been added here is a little bit of data access code that's going out
                        at runtime and getting a Customers collection populated:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>if (!DesignerProperties.GetIsInDesignMode(this))
{
    using (ZzaDbContext context = new ZzaDbContext())
    {
        Customers = new ObservableCollection&lt;Customer&gt;(context.Customers.Include(&quot;Orders&quot;).ToList());
    }
}</code></pre>
                        <figcaption>Fig 07-117</figcaption>
                    </figure>
                    <p>that's exposed from the code-behind as a DependencyProperty that has an ObservableCollection.</p>
                    <p>Notice it's also drilling down and getting the related Orders for those Customers:</p>
                    <figure>
                        <pre class="prettyprint"><code>context.Customers.Include(&quot;Orders&quot;)</code></pre>
                        <figcaption>Fig 07-118</figcaption>
                    </figure>
                    <p>which we'll use later in the demo, and it's also populating a States property:</p>
                    <figure>
                        <pre class="prettyprint"><code>States = statesStr.Split(',').ToList();</code></pre>
                        <figcaption>Fig 07-119</figcaption>
                    </figure>
                    <p>which is a collection of the state abbreviations, and that's all that's in the code-behind here.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-120.png" class="image"/>
                        <figcaption>Fig 07-120</figcaption>
                    </figure>
                    <p>Now especially when it comes to putting together a DataGrid, I find using the Data Sources Window to
                        generate the columns for me is very handy.
                    </p>
                    <p>Generally, you're not going to want to auto-generate the columns, because they won't be in the right
                        order and they includes certain properties you don't want to display, so you're going to need
                        explicitly-defined columns, and doing each one by hand in the XAML Editor is a lot of work.
                    </p>
                    <p>Using the Data Sources Window, as I showed in a previous module, and go add a data source:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-121.png" class="image"/>
                        <figcaption>Fig 07-121</figcaption>
                    </figure>
                    <p>point to the object type that you want, get it into the tree here:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-122.png" class="image"/>
                        <figcaption>Fig 07-122</figcaption>
                    </figure>
                    <p>and then just drag-and-drop to generate the DataGrid and all of its columns.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-123.png" class="image"/>
                        <figcaption>Fig 07-123</figcaption>
                    </figure>
                    <p>Now in this case I don't actually want all of those columns, and I want them in a different order. So
                        afterwards, I'm going to drop into the XAML and move some things around and delete a few columns.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid.Columns&gt;
                &lt;DataGridTextColumn x:Name=&quot;idColumn&quot;
                                    Width=&quot;Auto&quot;
                                    Header=&quot;Id&quot;
                                    Binding=&quot;{Binding Id}&quot; /&gt;
                &lt;DataGridTextColumn x:Name=&quot;firstNameColumn&quot;
                                    Width=&quot;Auto&quot;
                                    Header=&quot;First Name&quot;
                                    Binding=&quot;{Binding FirstName}&quot; /&gt;
                &lt;DataGridTextColumn x:Name=&quot;lastNameColumn&quot;
                                    Width=&quot;Auto&quot;
                                    Header=&quot;Last Name&quot;
                                    Binding=&quot;{Binding LastName}&quot; /&gt;
                &lt;DataGridTextColumn x:Name=&quot;phoneColumn&quot;
                                    Width=&quot;Auto&quot;
                                    Header=&quot;Phone&quot;
                                    Binding=&quot;{Binding Phone}&quot; /&gt;
                &lt;DataGridTextColumn x:Name=&quot;emailColumn&quot;
                                    Width=&quot;*&quot;
                                    Header=&quot;Email&quot;
                                    Binding=&quot;{Binding Email}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-124</figcaption>
                    </figure>
                    <p>I'm just going to do that all quickly here with cut and paste, and we get it down to Id, FirstName,
                        LastName, Phone, and Email, and lastly, a State column.
                    </p>
                    <p>I'm going to make one other modification up here at the root level, I'm going to set the DataContext
                        of the MainWindow to itself. So we saw this in earlier demos using a RelativeSource binding to Self:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>DataContext=&quot;{Binding RelativeSource={RelativeSource Self}}&quot;</code></pre>
                        <figcaption>Fig 07-125</figcaption>
                    </figure>
                    <p>meaning that the DataContext is the window itself, so the bindings within the view can point to
                        properties in the code-behind of the window, something you can do when you're not doing the MVVM
                        pattern.
                    </p>
                    <p>Next, I'm going to take the CollectionViewSource that was generated through the drag/drop and make a
                        modification to it:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
        &lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
            Source=&quot;{Binding Customers}&quot; /&gt;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-126</figcaption>
                    </figure>
                    <p>Setting the Source property equal to the Customers property that's being exposed from the
                        code-behind.</p>
                    <p>With that in place, I can go ahead and run:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-127.png" class="image"/>
                        <figcaption>Fig 07-127</figcaption>
                    </figure>
                    <p>and we've got our basic data-bound DataGrid scenario. Keep in mind, a DataGrid is editable, by
                        default, so I can go in here and start editing things. There's properties you can set to make it
                        read-only.
                    </p>
                    <p>Also, at the bottom, a DataGrid always has a new entry row, by default:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-128.png" class="image"/>
                        <figcaption>Fig 07-128</figcaption>
                    </figure>
                    <p>and again, you can set a property to get rid of that if you don't expect people to add new items from
                        the Grid. The basic properties in play here are, of course, ItemsSource:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>ItemsSource=&quot;{Binding}&quot;</code></pre>
                        <figcaption>Fig 07-129</figcaption>
                    </figure>
                    <p>because it is an ItemsControl; AutoGenerateColumns False:</p>
                    <figure>
                        <pre class="prettyprint"><code>AutoGenerateColumns=&quot;False&quot;</code></pre>
                        <figcaption>Fig 07-130</figcaption>
                    </figure>

                    <p>because we're explicitly declaring them, if you forget and leave that True, you'll get duplicate
                        columns; and then you declare a column for each column that you want in your DataGrid.
                    </p>
                    <p>Now the important thing, as I pointed out in a previous demo, is that these columns:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridTextColumn x:Name=&quot;idColumn&quot;
            Width=&quot;Auto&quot;
            Header=&quot;Id&quot;
            Binding=&quot;{Binding Id}&quot; /&gt;
&lt;DataGridTextColumn x:Name=&quot;firstNameColumn&quot;
            Width=&quot;Auto&quot;
            Header=&quot;First Name&quot;
            Binding=&quot;{Binding FirstName}&quot; /&gt;
&lt;DataGridTextColumn x:Name=&quot;lastNameColumn&quot;
            Width=&quot;Auto&quot;
            Header=&quot;Last Name&quot;
            Binding=&quot;{Binding LastName}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-131</figcaption>
                    </figure>
                    <p>Don't actually exist at runtime. They're a declaration used to generate cells within a row that
                        represent a column, but the Column objects here are just objects, they're not actually part of the
                        visual tree.
                    </p>
                    <p>So that might raise the question of how can they have bindings on them then? Well, the Binding
                        property here:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>Binding=&quot;{Binding Id}&quot;</code></pre>
                        <figcaption>Fig 07-132</figcaption>
                    </figure>
                    <p>is really creating a Binding object, which is held in this Binding property. It's then used to set
                        the binding on whatever element will be generated within a cell, within a row representing that
                        column. It's not actually evaluated at a column level when the DataGrid is being built, only down at
                        a cell level.
                    </p>
                    <p>Now these Width properties:</p>
                    <figure>
                        <pre class="prettyprint"><code>Width=&quot;Auto&quot;</code></pre>
                        <figcaption>Fig 07-133</figcaption>
                    </figure>
                    <p>are ones you can set size to Header, by default, but you can see it supports *, Auto, and explicit
                        sizing as well.
                    </p>
                    <p>Now when you do your drag-and-drop, it's going to assume everything is just plain text, but you might
                        want a more complicated rendering.
                    </p>
                    <p>There's other built-in column types such as a DataGridComboBoxColumn:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridComboBoxColumn x:Name=&quot;stateColumn&quot;
                                Width=&quot;100&quot;
                                Header=&quot;State&quot;
                                ItemsSource=&quot;{Binding RelativeSource={RelativeSource AncestorType=DataGrid}, Path=DataContext.States}&quot;
                                SelectedItemBinding=&quot;{Binding State}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-134</figcaption>
                    </figure>
                    <p>DataGridCheckBoxColumns, and so on. Now this DataGridComboBoxColumn may seen tempting, but it's
                        actually a little hard to work with at times because you need to set the ItemsSource to the
                        collection of things that's going to show up in the ComboBox, such as our list of states.
                    </p>
                    <p>But the overall DataContext, when this actually results in rendering a cell, is just going to be a
                        single Customer object in this case. And unless you hang the collection of states off of each
                        Customer object, the ItemsSource property can't get to it through a DataContext binding.
                    </p>
                    <p>Well, you might be tempted to try what I did here and use a RelativeSource binding:</p>
                    <figure>
                        <pre class="prettyprint"><code>&quot;{Binding RelativeSource={RelativeSource AncestorType=DataGrid}, Path=DataContext.States}&quot;</code></pre>
                        <figcaption>Fig 07-135</figcaption>
                    </figure>
                    <p>walking up the visual tree to the parent DataGrid, because after all, this is a ComboBoxColumn inside
                        of a Columns collection on the DataGrid, it should be able to walk that tree, right?
                    </p>
                    <p>Well, not so much, because again, these columns aren't part of the visual tree at runtime, they're
                        used to generate things at a row and cell level that are part of the visual tree, but the
                        ComboBoxColumn itself is not.
                    </p>
                    <p>So this RelativeSource binding basically won't work out. It does expose other properties, such as
                        SelectedItemBinding
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>SelectedItemBinding=&quot;{Binding State}&quot;</code></pre>
                        <figcaption>Fig 07-136</figcaption>
                    </figure>
                    <p>which corresponds to the SelectedItem property for the ComboBox that will be rendered out. As long as
                        you can get a valid binding in there, that'll work fine, as well as SelectedValueBinding, and so on.
                    </p>
                    <p>But if we run right now, you can see that our State column looks kind of empty initially:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-137.png" class="image"/>
                        <figcaption>Fig 07-137</figcaption>
                    </figure>
                    <p>If we click on it and go into edit mode, then it does actually render like a ComboBox, but the
                        ComboBox is empty.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-138.png" class="image"/>
                        <figcaption>Fig 07-138</figcaption>
                    </figure>
                    <p>What do want to do when your binding is not doing exactly what you expect it to do? Go look at your
                        output window. Down here in the output window, we can see a System.Windows.Data Error:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-139.png" class="image"/>
                        <figcaption>Fig 07-139</figcaption>
                    </figure>
                    <p>and it says, Cannot find source for binding 'RelativeSource FindAncestor', and it's looking for a
                        DataGrid.</p>
                    <p>The hard part is, there's nothing in this error message that's really going to tip you off if you
                        haven't seen this video or learned about it somewhere else. The problem is that the DataGrid column
                        is not part of the visual tree, so it's not able to walk up and find that DataGrid because it's just
                        not there at the point where this binding is being evaluated.
                    </p>
                    <p>So, what we can do instead is use a TemplatedColumn:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridTemplateColumn x:Name=&quot;stateColumn&quot;
                        Width=&quot;Auto&quot;
                        Header=&quot;State&quot;&gt;
    &lt;DataGridTemplateColumn.CellTemplate&gt;
        &lt;DataTemplate&gt;
            &lt;ComboBox ItemsSource=&quot;{Binding RelativeSource={RelativeSource AncestorType=DataGrid}, Path=DataContext.States}&quot;
                      SelectedItem=&quot;{Binding State}&quot; /&gt;
        &lt;/DataTemplate&gt;
    &lt;/DataGridTemplateColumn.CellTemplate&gt;
&lt;/DataGridTemplateColumn&gt;</code></pre>
                        <figcaption>Fig 07-140</figcaption>
                    </figure>
                    <p>TemplatedColumn is a very important concept in DataGrids because it gives you full control over
                        exactly what the visual that will be rendered inside of a cell is.
                    </p>
                    <p>At the TemplatedColumn level, you can still set the Header that will be shown at the top of the Grid
                        and the Width of the column, but everything else will be driven by what you put in the CellTemplate:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridTemplateColumn.CellTemplate&gt;
    &lt;DataTemplate&gt;
        &lt;ComboBox ItemsSource=&quot;{Binding RelativeSource={RelativeSource AncestorType=DataGrid}, Path=DataContext.States}&quot;
                  SelectedItem=&quot;{Binding State}&quot; /&gt;
    &lt;/DataTemplate&gt;
&lt;/DataGridTemplateColumn.CellTemplate&gt;</code></pre>
                        <figcaption>Fig 07-141</figcaption>
                    </figure>
                    <p>I should mention there's also a CellEditingTemplate property on the column if you want a different
                        visual rendering for edit mode versus non-edit mode.
                    </p>
                    <p>If you don't set that, it'll use whatever is in the CellTemplate for both modes. CellTemplate is
                        nothing more than a DataTemplate that you can put whatever visual structuring in you want.
                    </p>
                    <p>So, here we use an actual ComboBox:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ComboBox ItemsSource=&quot;{Binding RelativeSource={RelativeSource AncestorType=DataGrid}, Path=DataContext.States}&quot;
        SelectedItem=&quot;{Binding State}&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-142</figcaption>
                    </figure>
                    <p>with all of its normal ComboBox properties, and in this case, we can use a RelativeSourceBinding, and
                        that's because this ComboBox doesn't come into being until the DataTemplate is rendered within a
                        cell, that cell is in a row, the row is in the DataGrid, so the RelativeSource is actually able to
                        walk up the visual tree and get to whatever it's pointing to.
                    </p>
                    <p>So in this case, I'll point it to the Window level, to the DataContext property, which will be the
                        Window itself, to the States property that's exposed on that.
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>RelativeSource={RelativeSource AncestorType=Window}, Path=DataContext.States}&quot;</code></pre>
                        <figcaption>Fig 07-143</figcaption>
                    </figure>
                    <p>So it's able to use that to get the list of states to render in the ComboBox and then we do the
                        SelectedItem Binding:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>SelectedItem=&quot;{Binding State}&quot;</code></pre>
                        <figcaption>Fig 07-144</figcaption>
                    </figure>
                    <p>against the current DataContext, which is a Customer object.</p>
                    <p>So we grab the State property off that Customer object to drive what's selected. With that in place,
                        we can run, resize our window, and we can see off to the right our ComboBoxes are there:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-145.png" class="image"/>
                        <figcaption>Fig 07-145</figcaption>
                    </figure>
                    <p>rendering as ComboBoxes interactive all the time, even before you click into the row and get it in
                        edit mode.
                    </p>
                    <p>And we can see that they show the list of items and are data-bound to that.</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-146.png" class="image"/>
                        <figcaption>Fig 07-146</figcaption>
                    </figure>
                    <p>When we set those, they're setting the SelectedItem, which is bound to the state of the Customer and
                        it actually sets that on the Customer.
                    </p>
                    <p>Another last capability to highlight here in DataGrids, is the ability to provide a
                        RowDetailTemplate:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid.RowDetailsTemplate&gt;
    &lt;DataTemplate&gt;
        &lt;DataGrid ItemsSource=&quot;{Binding Orders}&quot;
                  AutoGenerateColumns=&quot;True&quot; /&gt;
    &lt;/DataTemplate&gt;
&lt;/DataGrid.RowDetailsTemplate&gt;</code></pre>
                        <figcaption>Fig 07-147</figcaption>
                    </figure>
                    <p>So I'm going to pop in here another property on the DataGrid, RowDetailsTemplate, which is just a
                        DataTemplate that will be rendered out as a child panel on each row when it's selected by default.
                    </p>
                    <p>It's driven by a property at the DataGrid level called RowDetailsVisibilityMode:</p>
                    <figure>
                        <pre class="prettyprint"><code>RowDetailsVisibilityMode=&quot;VisibleWhenSelected&quot;</code></pre>
                        <figcaption>Fig 07-148</figcaption>
                    </figure>
                    <p>You can set this to collapsed and then programmatically toggle it, or you can use this
                        VisibleWhenSelected.</p>
                    <p>And what you put inside of that DataTemplate is totally up to you. The DataContext for the
                        DataTemplate is going to be the RowDataContext, which means a Customer in our current case.
                    </p>
                    <p>So, because we populated the child Orders for a Customer in the query in the code-behind:</p>
                    <figure>
                        <pre class="prettyprint"><code>Customers = new ObservableCollection&lt;Customer&gt;(context.Customers.Include(&quot;Orders&quot;).ToList());</code></pre>
                        <figcaption>Fig 07-149</figcaption>
                    </figure>
                    <p>it means that we can bind to that as a property hanging off of the current DataContext for a given
                        row, which will be the customer.
                    </p>
                    <p>In this case, I'm just going to cheat and say, AutoGenerateColumns True, but in a real scenario you'd
                        want to explicitly declare just the columns that you want. But this could be a little data entry
                        form, some sort of rendering of the properties of an individual object hanging off of the current
                        row object, such as an address for the customer or so on.
                    </p>
                    <p>So let's go ahead and run with that. Let's also resize our Grid, do a Reset Layout, All, so it fills
                        the window here, and go ahead and run:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-150.png" class="image"/>
                        <figcaption>Fig 07-150</figcaption>
                    </figure>
                    <p>Now we can see the first row is selected, so we see this child DataGrid containing the orders, and as
                        we select each row we see a child DataGrid with the orders for that item.
                    </p>
                    <p>Obviously, it needs some prettying up with some margins, some backgrounds, you probably want to get
                        rid of the input row for the child items, and so on, but you can see through a DataTemplate you can
                        put whatever you want in that child panel when the row is selected. So those are all the key things
                        you want to know about working with DataGrids and data binding.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Collection Views</h3>
                    <p>Now let's talk about some of the other things you can do with CollectionViewSources. We've seen these
                        in a number of demos so far, especially those generated by the drag-and-drops from the Data Sources
                        Window.
                    </p>
                    <p>And we mentioned them in a previous module when talking about the ICollectionView interface. So,
                        first off, a CollectionViewSource wraps a collection by pointing to it through its Source property,
                        and then you can use the CollectionViewSource as a collection for data binding. A
                        CollectionViewSource exposes an ICollectionView.
                    </p>
                    <p>So if you want to deal with the ICollectionView, typically for something like maintaining what is the
                        current object or moving the cursor of what the current object is around in the collection, you can
                        do that with the ICollectionView interface, exposed through a .View property on a
                        CollectionViewSource.
                    </p>
                    <p>But what we're going to focus on here, is that you can also use the CollectionViewSource to morph or
                        change the rendered data collection, and use it to sort the data collection, filter which items are
                        presented, or group the items. Additionally, CollectionViewSources are very handy for Master-Detail
                        scenarios, being able to chain together a parent collection to a child collection, to a grandchild
                        collection, and so on, and render those out nicely based on user selections in the view.
                    </p>
                    <p>The way you do this is by chaining them, so you set up multiple CollectionViewSources and you set the
                        source of one CollectionViewSource to a parent CollectionViewSource and use a property path to
                        indicate what properties on the current object in that parent CollectionViewSource should drive the
                        child CollectionViewSource.
                    </p>
                    <p>So let's see how we can sort, filter, and group in one demo, and how we can set up Master-Details in
                        another demo.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Sorting, Filtering, Grouping with CollectionViewSource</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-011" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\DataGrids\DataGrids.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-011">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-012" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\DataGrids\DataGrids.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-012">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>In this demo, I want to get you familiar with some of the extra things that a CollectionViewSource
                        can do for you when working with data-bound collections, specifically sorting, filtering, and
                        grouping.
                    </p>
                    <p>Starting point here is the end of our last demo working with DataGrids. I'm going to take my DataGrid
                        and pull it down from the top a little bit so that I have room to add some buttons:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-151.png" class="image"/>
                        <figcaption>Fig 07-151</figcaption>
                    </figure>
                    <p>I'm going to drop into the UI here and add a button, its content is set to Sort:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Button Content=&quot;Sort&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;10,3,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;75&quot;
Click=&quot;OnSort&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-152</figcaption>
                    </figure>
                    <p>and we're going to hook up an OnSort method in the code-behind. Our OnSort handler here, you can see,
                        is going to reach out and find that customersViewSource that's up in the XAML.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSort(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;)
        as CollectionViewSource;
    customerViewSource.SortDescriptions.Add(
        new SortDescription(&quot;State&quot;, ListSortDirection.Ascending));
}</code></pre>
                        <figcaption>Fig 07-153</figcaption>
                    </figure>
                    <p>This is the one that was generated through drag-and-drop and slightly modified in the last demo, but
                        it's pointing to the Customers collection exposed from the Window code-behind, which is our
                        DataContext:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
        &lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
                      Source=&quot;{Binding Customers}&quot;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-154</figcaption>
                    </figure>
                    <p>So once we have a reference to a CollectionViewSource:</p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSort(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;)
        as CollectionViewSource;
    customerViewSource.SortDescriptions.Add(
        new SortDescription(&quot;State&quot;, ListSortDirection.Ascending));
}</code></pre>
                        <figcaption>Fig 07-155</figcaption>
                    </figure>
                    <p>it exposes a number of methods and properties we can use to modify the collection it exposes for data
                        binding purposes, first of which is a SortDescriptions property.
                    </p>
                    <p>It's a collection of SortDescriptions that supports multi-sorting, and we just add new
                        SortDescription objects into it, telling it what property to sort on and what direction to sort.
                    </p>
                    <p>So just simply by adding that and hooking that up to a button, we can go ahead and run, and we can
                        see I will click on the Sort property:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-156.png" class="image"/>
                        <figcaption>Fig 07-156</figcaption>
                    </figure>
                    <p>and now things are sorted by state:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-157.png" class="image"/>
                        <figcaption>Fig 07-157</figcaption>
                    </figure>
                    <p>Now there is a slightly different way to go about this using CollectionViews, instead of the
                        CollectionViewSource explicitly:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSort(object sender, RoutedEventArgs e)
{
    //var customerViewSource = FindResource(&quot;customerViewSource&quot;) as CollectionViewSource;
    //customerViewSource.SortDescriptions.Add(new SortDescription(&quot;State&quot;, ListSortDirection.Ascending));

    ICollectionView view = customerViewSource.View as ICollectionView;
    view.SortDescriptions.Add(new SortDescription(&quot;State&quot;, ListSortDirection.Ascending));
}</code></pre>
                        <figcaption>Fig 07-158</figcaption>
                    </figure>
                    <p>So I could comment out the line of code that went directly to the SortDescriptions property of the
                        CollectionViewSource, and instead use the .View property on the CollectionViewSource to get a
                        reference to the ICollectionView interface.
                    </p>
                    <p>We've seen this one in previous demos in an earlier module and we used it to drive the current object
                        within the collection and to be able to move that cursor, if you will, for the current object,
                        forward and backward to select different items in the collection. Well the CollectionView is really
                        the thing that knows how to do the sorting, and it really exposes the same API.
                    </p>
                    <p>It has a SortDescriptions collection:</p>
                    <figure>
                        <pre class="prettyprint"><code>view.SortDescriptions.Add(new SortDescription(&quot;State&quot;, ListSortDirection.Ascending));</code></pre>
                        <figcaption>Fig 07-159</figcaption>
                    </figure>
                    <p>that you can add new SortDescriptions into, and do the exact same thing that we were doing directly
                        on the SortDescriptions here. By doing it through ICollectionView, you're not coupled to whether
                        you're actually using a CollectionViewSource or not.
                    </p>
                    <p>I showed in a previous demo, there's always an ICollectionView under the covers you can get to
                        through GetDefaultView. So we could sort through that, even if we're not using a
                        CollectionViewSource. Functionality here is exactly the same.
                    </p>
                    <p>Now another thing I might want to do is filter my data based on some criteria. So I'm going to drop
                        down here and add another button, which will show up at the top, called Filter:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Button Content=&quot;Filter&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;90,3,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;75&quot;
    Click=&quot;OnFilter&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-160</figcaption>
                    </figure>
                    <p>and it's going to target a method we'll add in the code-behind called OnFilter. I'll drop in the
                        code-behind and add that method:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnFilter(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;) as CollectionViewSource;
    customerViewSource.Filter += customerViewSource_Filter;

}</code></pre>
                        <figcaption>Fig 07-161</figcaption>
                    </figure>
                    <p>and you can see what the API looks like here is, again, we reach out and get a reference to our
                        CollectionViewSource. That CollectionViewSource has an event on it called Filter:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnFilter(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;)
        as CollectionViewSource;
    customerViewSource.Filter += customerViewSource_Filter;
}</code></pre>
                        <figcaption>Fig 07-162</figcaption>
                    </figure>
                    <p>and when you hook up a subscriber to that event it's going to trigger it to reevaluate its
                        collection, fire that event once for each object:
                    </p>
                    <figure>
                <pre class="prettyprint"><code> void customerViewSource_Filter(object sender, FilterEventArgs e)
{
    Customer c = e.Item as Customer;
    if (c.State == &quot;AK&quot;) e.Accepted = true;
    else e.Accepted = false;
}</code></pre>
                        <figcaption>Fig 07-163</figcaption>
                    </figure>
                    <p>and let your event handler decide whether to include that object or not.</p>
                    <p>So you can see the event handler takes in a FilterEventArgs. Inside of that EventArgs is an item,
                        which is the data-bound object it's evaluating, and you're expected to return a Boolean through the
                        Accepted property of the EventArg. So here I'm just inspecting, is the State equal to Alaska? If so,
                        I set Accepted to true and it will be presented, otherwise, I set it to false.
                    </p>
                    <p>So I can go ahead and run this, expand so we can see our states a little better, hit the filter, and
                        now we see only Alaska.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-164.png" class="image"/>
                        <figcaption>Fig 07-164</figcaption>
                    </figure>
                    <p>Now, of course, the way this is wired up right now, we would be re-subscribing each time I click on
                        the button, so you'd want to structure that a little bit differently and do it one time as the view
                        initializes. I just wanted to keep it all local here for demo purposes.
                    </p>
                    <p> Now, again, if you go through the CollectionView, there's a little bit different way to get it
                        hooked up here
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnFilter(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;) as CollectionViewSource;
    //customerViewSource.Filter += customerViewSource_Filter;

    ICollectionView view = customerViewSource.View as ICollectionView;
    view.Filter = (item) =&gt;
        {
            Customer c = item as Customer;
            return c.State == &quot;AZ&quot; ? true : false;
        };
}</code></pre>
                        <figcaption>Fig 07-165</figcaption>
                    </figure>
                    <p>So we could get to our CollectionViewSource and get to its underlying ICollectionView.</p>
                    <p>And then, instead of the event-based model, which I've always kind of hated events where you're
                        expected to set properties on the EventArgs to make things happen by the caller. It kind of violates
                        the fire-and-forget notion of events, so I'm not a big fan of this event-based way of doing it.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>void customerViewSource_Filter(object sender, FilterEventArgs e)
{
    Customer c = e.Item as Customer;
    if (c.State == &quot;AK&quot;) e.Accepted = true;
    else e.Accepted = false;
}</code></pre>
                        <figcaption>Fig 07-166</figcaption>
                    </figure>
                    <p>The ICollectionView way is a little bit more explicit. What you set is a Filter property on the
                        view.</p>
                    <p>The Filter property is set to a delegate type that's called Predicate. Predicate takes in an
                        object:</p>
                    <figure>
                        <pre class="prettyprint"><code>view.Filter =  (item) =></code></pre>
                        <figcaption>Fig 07-167</figcaption>
                    </figure>
                    <p>and returns a Boolean.</p>
                    <figure>
                        <pre class="prettyprint"><code>return c.State == &quot;AZ&quot; ? true : false;</code></pre>
                        <figcaption>Fig 07-168</figcaption>
                    </figure>
                    <p>And basically, the Filter Predicate will be evaluated once for each object in the collection any time
                        you set the Filter property or you change the underlying collection. So this is just a little bit
                        more explicit that you pass in an item and you return a Boolean to say yes or no whether you should
                        include it.
                    </p>
                    <p>In this case, I'm doing Arizona instead of Alaska.</p>
                    <p>So with that hooked up, I can run, and we'll see the exact same behavior, just for a different state,
                        click on Filter, and now we just have the two Arizona customers.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-169.png" class="image"/>
                        <figcaption>Fig 07-169</figcaption>
                    </figure>
                    <p>Lastly, through the CollectionViewSource you can do grouping. So I'll add another button in my UI
                        here to Group objects:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Button Content=&quot;Group&quot;
    HorizontalAlignment=&quot;Left&quot;
    Margin=&quot;170,3,0,0&quot;
    VerticalAlignment=&quot;Top&quot;
    Width=&quot;75&quot;
    Click=&quot;OnGroup&quot; /&gt;</code></pre>
                        <figcaption>Fig 07-170</figcaption>
                    </figure>
                    <p>and I'll drop into the code-behind and add a handler for that OnGroup method.</p>
                    <figure>
                <pre class="prettyprint"><code>private void OnGroup(object sender, RoutedEventArgs e)
{
    var customerViewSource = FindResource(&quot;customerViewSource&quot;)
        as CollectionViewSource;
    customerViewSource.GroupDescriptions.Add(new PropertyGroupDescription(&quot;State&quot;));
}</code></pre>
                        <figcaption>Fig 07-171</figcaption>
                    </figure>
                    <p>Similar thing, I need to get a reference to my CollectionViewSource and it exposes a
                        GroupDescriptions property. Now this one I'm not going to show, but there is a way to go down
                        through the ICollectionView and it has a GroupDescriptions property as well.
                    </p>
                    <p>Here we just add a new PropertyGroupDescription, tell it what property it's based on, and it's going
                        to start grouping based on that property. If we go ahead and run with that, click on Group, now we
                        can see the groupings of states over on the right.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-172.png" class="image"/>
                        <figcaption>Fig 07-172</figcaption>
                    </figure>
                    <p>Now just having them grouped like that may not be enough visual indication, so the DataGrid and
                        ListView controls in WPF support styling based on that group. So I can go back to my XAML here, go
                        up to my DataGrid, and add a property called GroupStyle to the DataGrid, setting it to a GroupStyle
                        instance:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid.GroupStyle&gt;
    &lt;GroupStyle&gt;
        &lt;GroupStyle.HeaderTemplate&gt;
            &lt;DataTemplate&gt;
                &lt;TextBlock Text=&quot;{Binding Name}&quot; /&gt;
            &lt;/DataTemplate&gt;
        &lt;/GroupStyle.HeaderTemplate&gt;
    &lt;/GroupStyle&gt;
&lt;/DataGrid.GroupStyle&gt;</code></pre>
                        <figcaption>Fig 07-173</figcaption>
                    </figure>
                    <p>and the GroupStyle can have various things in it, but one of the things it has is a HeaderTemplate.
                        That's just a DataTemplate that you can put whatever you want in it.
                    </p>
                    <p>Now the DataContext for this is not going to be a RowObject, it's actually going to be the Group
                        itself, which will have its Name property set based on the Group that it's rendering.
                    </p>
                    <p>So the binding is generally going to be Name here, but with that in place we can go ahead and run
                        again:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-174.png" class="image"/>
                        <figcaption>Fig 07-174</figcaption>
                    </figure>
                    <p>click on Group, and now we see it puts these bands in here in between the groups and renders out our
                        GroupStyleTemplate.
                    </p>
                    <p>Obviously, you could put some better visual structure to that to make it prettier, but that's how you
                        deal with sorting, filtering, and grouping using the CollectionViewSource.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Master-Details with CollectionViewSources</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-013" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\before\MasterDetails\MasterDetails.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-013">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex08-014" type="text" class="form-control"
                                   value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 8\after\MasterDetails\MasterDetails.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex08-014">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>

                    <p>The last I want to show here with respect to CollectionViewSources is how you can use it to drive a
                        Master-Details presentation of related collections and objects. My starting point here is a basic
                        WPF project.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-175.png" class="image"/>
                        <figcaption>Fig 07-175</figcaption>
                    </figure>
                    <p>The only thing going on ahead of time is some data access code in the code-behind of the window
                        populating a Customers property that we're going to be data binding to
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public MainWindow()
{
    InitializeComponent();
    using (ZzaDbContext context = new ZzaDbContext())
    {
        Customers = new ObservableCollection&lt;Customer&gt;(context.Customers.Include(&quot;Orders&quot;).Include(&quot;Orders.OrderItems&quot;).Include(&quot;Orders.OrderItems.Product&quot;));
    }
}

public ObservableCollection&lt;Customer&gt; Customers
{
    get { return (ObservableCollection&lt;Customer&gt;)GetValue(CustomersProperty); }
    set { SetValue(CustomersProperty, value); }
}

public static readonly DependencyProperty CustomersProperty =
    DependencyProperty.Register(&quot;Customers&quot;, typeof(ObservableCollection&lt;Customer&gt;), typeof(MainWindow), new PropertyMetadata(null));</code></pre>
                        <figcaption>Fig 07-176</figcaption>
                    </figure>
                    <p>When I populate Customers, notice I'm also drilling down and getting the related Orders, the related
                        OrderItems for the Orders, and the related Product for the OrderItem using Entity Framework.
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>context.Customers.Include(&quot;Orders&quot;).Include(&quot;Orders.OrderItems&quot;).Include(&quot;Orders.OrderItems.Product)</code></pre>
                        <figcaption>Fig 07-177</figcaption>
                    </figure>
                    <p>I can go into the designer and the Data Sources Window, and I've already added Data Sources for our
                        Entity objects we're going to be working with here.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-178.png" class="image"/>
                        <figcaption>Fig 07-178</figcaption>
                    </figure>
                    <p>As we've seen in a previous module, I can start at the root level with Customer, drag-and-drop, and
                        generate a grid.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-179.png" class="image"/>
                        <figcaption>Fig 07-179</figcaption>
                    </figure>
                    <p>I'm going to resize that grid to fit towards the top here. Now, for the related Orders and
                        OrderItems, it might be tempting to drag out from this level:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-180.png" class="image"/>
                        <figcaption>Fig 07-180</figcaption>
                    </figure>
                    <p>but if you do you're generating a DataGrid that's bound to an independent collection of orders or
                        OrderItems.
                    </p>
                    <p>What you want to do is drill down to the property on a Customer that is the Orders collection related
                        to that customer.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-181.png" class="image"/>
                        <figcaption>Fig 07-181</figcaption>
                    </figure>
                    <p>Do your drag-and-drop from there, and the designer will do the right thing, which we'll show the code
                        for in a moment, to generate a different CollectionViewSource, but to tie that CollectionViewSource
                        to the parent CollectionViewSource:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-182.png" class="image"/>
                        <figcaption>Fig 07-182</figcaption>
                    </figure>
                    <p>Likewise, I can drill down another level to OrderItems:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-183.png" class="image"/>
                        <figcaption>Fig 07-183</figcaption>
                    </figure>
                    <p>drag that out, and have that related to the parent Orders collection. And then we could go one level
                        down to the related Product, switch that to use the Details view:
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-184.png" class="image"/>
                        <figcaption>Fig 07-184</figcaption>
                    </figure>
                    <p>and generate a little data form for the current product:</p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-185.png" class="image"/>
                        <figcaption>Fig 07-185</figcaption>
                    </figure>
                    <p>and I won't worry about the fact that it's being clipped off there.</p>
                    <p>With that code in place, it also generated the Loaded event handler and all I've got to do is go set
                        the Source property for the root customerViewSource to my Customers collection that I populated on
                        construction.
                    </p>
                    <figure>
                <pre class="prettyprint"><code> private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            System.Windows.Data.CollectionViewSource customerViewSource = ((System.Windows.Data.CollectionViewSource)(this.FindResource(&quot;customerViewSource&quot;)));
            // Load data by setting the CollectionViewSource.Source property:
            customerViewSource.Source = Customers;
        }</code></pre>
                        <figcaption>Fig 07-186</figcaption>
                    </figure>
                    <p>So with that in place, I can run, and notice that we have the, not very well laid out, but we have
                        customers up above. Whatever customer I select, we're seeing the orders for that customer in the
                        next grid down. Whatever order I select, I'm seeing the order details, and whatever order detail I
                        select, I'm seeing the related product.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig07-187.png" class="image"/>
                        <figcaption>Fig 07-187</figcaption>
                    </figure>
                    <p>So a typical chained Master-Details kind of setup, all in seconds with drag-and-drop. Now let's look
                        at the XAML that it generated, because that's where all the action is. And the magic key really has
                        to do with these CollectionViewSources.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Window.Resources&gt;
    &lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
                    d:DesignSource=&quot;{d:DesignInstance {x:Type Data:Customer}, CreateList=True}&quot;/&gt;
    &lt;CollectionViewSource x:Key=&quot;customerOrdersViewSource&quot;
                    Source=&quot;{Binding Orders, Source={StaticResource customerViewSource}}&quot;/&gt;
    &lt;CollectionViewSource x:Key=&quot;customerOrdersOrderItemsViewSource&quot;
                    Source=&quot;{Binding OrderItems, Source={StaticResource customerOrdersViewSource}}&quot;/&gt;
&lt;/Window.Resources&gt;</code></pre>
                        <figcaption>Fig 07-188</figcaption>
                    </figure>
                    <p>The first one was generated from the drag-and-drop of the CustomerEntityType, and we've talked
                        through that before, that it sets it up, says it going to be dealing with Customer, and that's the
                        one that we're populating from the code-behind at runtime.
                    </p>
                    <p>Where the Master-Details happens here is, notice the Source of the second one it generated for
                        Orders. Its set to a Binding whose Source is explicitly set to be the CollectionViewSource up above
                        for the Customers. That Customers collection is going to have a current item in it, as we've talked
                        about before, and that current item is going to have an Orders property. So the path on this Binding
                        is to the Orders property of the current item in that collection.
                    </p>
                    <p>Likewise, for the OrderItemsViewSource it's pointing to the OrdersViewSource into the OrderItems
                        property on the current item in that OrdersViewSource. Notice there's not a separate
                        CollectionViewSource for the Product.
                    </p>
                    <p>When I generated the grid containing the data entry fields for the product, it set the DataContext
                        for that grid to the OrderItemsViewSource, which again, is going to have a current item that's an
                        OrderItem. And then it generated the bindings on the individual fields to use the property
                        Product.Description, Product.HasOptions, and so on.
                    </p>
                    <p>So you can see through the currency that's managed by an ICollectionview, which a
                        CollectionViewSource has under the covers, whenever the current item changes, if there's another
                        CollectionViewSource that's bound to that collection in the current item, it can get to the
                        properties of that current item and use that to drive a separate CollectionViewSource, and so on
                        down the chain.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Summary</h3>
                    <p>Okay, in this module we went through a lot about container controls and the dynamic generation of
                        child controls based on data binding, as well as collection controls and how they really worked.
                    </p>
                    <p>So first we looked at ContentControls and ItemsControls and their pivotal role in the dynamic UI
                        composition based on data binding. We saw that ContentControls render out ContentPresenters, and
                        it's inside the ContentPresenter that the actual data-driven content, such as a DataTemplate, gets
                        rendered.
                    </p>
                    <p>Likewise, in an ItemsControl, an ItemsControl will render out an ItemsPresenter, and that
                        ItemsPresenter will be responsible for rendering out individual item containers. Inside those
                        containers, eventually, are often ContentPresenters that show the content for an individual
                        DataObject.
                    </p>
                    <p>Next, we reviewed ComboBoxes and ListBoxes, mainstays of data binding, and just made sure you were
                        familiar with all the key properties associated with data binding, including ItemsSource,
                        DisplayMemberPath, SelectedValuePath, SelectedValue, SelectedItem, and so on.
                    </p>
                    <p>Next, we took a look at TabControls and you saw that they can be data-driven as well, especially for
                        dynamic child view containment scenarios. They can point to a collection of ViewModels or data
                        objects that are going to be rendered through a DataTemplate, and the views that get rendered inside
                        the tabs can be driven by DataTemplates, as well as a DataTemplate to render the header in the top
                        part of the tab that shows at the top of a TabControl by default.
                    </p>
                    <p>We drilled into DataGrids and got familiar with the key properties associated with data bindings and
                        the things you could do there. We covered the fact that DataGrids are really just an ItemsControl
                        that's going to render out rows for each of the items in the data-bound collection. DataGrids are
                        defined through columns, but the columns aren't really part of the DataGrid at runtime, as I
                        emphasized.
                    </p>
                    <p>Column definitions result in rows and cells being rendered. So the bindings you specify at a column
                        level, really result in cell-level container bindings at runtime. As a result, certain kinds of
                        bindings won't work in columns, specifically RelativeSource bindings and ElementName bindings.
                    </p>
                    <p>For those, you can use a CellTemplate. CellTemplate gives you full control of exactly what's going in
                        to a cell, you define a DataTemplate that contains the content you want to see in that cell, and
                        that DataTemplate can contain whatever bindings relative to the DataContext of the row that you
                        want.
                    </p>
                    <p>So if the row is a customer, you can point to properties on the customer and any normal data binding
                        should work there, including RelativeSource bindings and ElementName bindings because the cells are
                        part of the visual tree, the columns are not.
                    </p>
                    <p>We also looked at the fact that DataGrid RowDetailTemplates allow you to provide a child panel that
                        shows up associated with each row that you can populate with the DataTemplate with whatever
                        structure you want in there.
                    </p>
                    <p>It could contain an entire data form, it could contain a child DataGrid, anything you want to put in
                        there, the DataContext for that RowDetailTemplate will be the data-bound row object, such as a
                        customer, and you can use any properties hanging off that customer to render out child details in
                        that panel.
                    </p>
                    <p>Finally, we finished off with CollectionViewSource and you saw that it gives you a very nice,
                        easy-to-use way to sort, filter, group, and do master-detail type setups when working with
                        collections or multiple collections in your views.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WPFDataBindingInDepth08ContainersAndCollectionsControls.vue"
    }
</script>

<style scoped>

</style>