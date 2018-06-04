<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Data Binding Overview</h2>
                </div>
                <div class="panel-body">
                    <h3>Introduction</h3>
                    <p>
                        Hi there. This is Brian Noyes, and in this first module we're going to go through a high-level overview of
                        what data binding is all about in WPF, why you want to use it, and what some of the fundamental concepts are
                        that you'll need to master to understand the rest of the course, where we'll dive deep enough to turn you into
                        a data binding ninja.
                    </p>
                    <p>
                        First I'm going to go through a high-level overview of what data binding is all about and why you want to use
                        it, what some of the benefits are, and what it does for you. Next I'll talk about some of the key concepts,
                        things like bindings and DataContext, and Change Notifications, and the role that they play in using data
                        binding.
                    </p>
                    <p>
                        Then I'll go a little bit deeper on DataContext and talk about the scoping mechanisms of DataContext and how
                        you can use it to control what data flows to what part of your views.
                    </p>
                    <p>
                        And then we'll finish off the module with a series of demos that starts off with a data-driven form, not using
                        data binding at all, then transforming that to use data binding to see some of the benefits there, and
                        finally, cleaning that up a little bit by consolidating your data sources into a single DataContext object.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Data Binding Overview</h3>
                    <p>
                        So let's start off by talking about what data binding is about and why it's important to you. First off, data
                        binding is one of the more powerful XAML platform features and it's certainly not limited to just WPF. A lot
                        of the things we're going to be talking about in this course apply equally to Windows 8 development, Windows
                        Phone development, and even the somewhat defunct Silverlight. Certainly there are other platform features such
                        as visual states and styling and resources that are equally as important and what makes XAML a great platform
                        for developing applications, but data binding stands out to me as one of the most powerful features because of
                        how it lets you architect your application.
                    </p>
                    <p>
                        First off, it promotes loose coupling, and loose coupling means different things, but in the context of data
                        binding what it does is it lets you decouple, first off, the View from the data model. So the data model
                        objects that get loaded up with data and that you're going to use to ultimately drive what you see on the
                        screen, the view doesn't need to be tightly coupled to exactly what type of objects those are, how they get
                        populated, where they're held in memory, and so on.
                    </p>
                    <p>
                        Additionally, you can keep the View decoupled from the data access that populates those data models, so
                        whether you get objects over service calls, go directly out to a relational database, load them up from flat
                        files, the View doesn't have to know anything about that. And most specifically, when we're talking about View
                        here, we really mean the elements within the View that represent the renderable content that you see on
                        screen. Additionally through data binding, the view can stay decoupled from the interaction logic, the logic
                        that gets invoked when the user clicks on something, selects something, navigates around the application, all
                        of that stuff can be decoupled from the elements of the view using data binding. Now to fully achieve that,
                        you really have to take a step further and consider something like the Model-View-ViewModel pattern, but it's
                        really data binding that makes that possible.
                    </p>
                    <p>
                        Additionally, data binding reduces the overall amount of code you'll have to write and you'll see that in the
                        demos towards the end of the module. So that reduction in code can mean shorter time to market in getting your
                        app out there at first, and it means less time to create new features and fix bugs when you're maintaining the
                        application. So that code reduction comes in, in several forms. One is that the automatic data flow to and
                        from the screen that data binding enables, means that you have to write less code to explicitly push and pull
                        data from individual properties on elements within the screen.
                    </p>
                    <p>
                        Additionally, just in terms of conceptualizing and implementing the code, it allows you to form natural
                        associations between data objects and their properties and screen elements that are going to render out the
                        content of those objects.
                    </p>
                    <p>
                        One of the other benefits of data binding is it facilitates a developer-designer workflow. Now what that means
                        is that one of the key concepts in XAML-based applications is the idea that you should be able to take your
                        XAML and hand it over to a professional designer and let them go party on that XAML and change elements and
                        add animations, and style it like crazy, and it shouldn't break anything in the app, but the more the elements
                        are tightly coupled to the code-behind, especially with lots of push-pull logic and stuff like that, then it's
                        going to be harder for the designer to swap out, say, a label for a textbox, because the properties on those
                        elements that you're going to push data into is going to change with the change of an element.
                    </p>
                    <p>
                        With data binding you just have declarations in the XAML that the designer can be in control of and they can
                        move those bindings around and put them on the appropriate properties on the elements as they switch things
                        out. So this allows designers to work more in isolation and independently from the developers and not have to
                        coordinate on every little change that they make.
                    </p>
                    <p>
                        Now another important concept the data binding leads into is the Model-View-ViewModel pattern, MVVM. I'm not
                        going to go into any depth on MVVM in this course. I would recommend you check out my other Pluralsight
                        course, Building Windows 8 MVVM Applications, because in that course I cover the MVVM pattern, the concepts
                        behind it, and I'd say a good 70-80% of what I cover in that course equally applies to WPF. You would have to
                        ignore some of the Windows 8 specifics such as the application lifecycle and navigation schemas of Windows 8,
                        which are different in WPF, but the fundamentals of the MVVM pattern are covered well there and apply equally
                        to WPF.
                    </p>
                    <p>
                        Now for most of this course I am not going to use MVVM in my demos, just to emphasize that data binding is
                        powerful and useful in its own right and you don't have to do the MVVM pattern to get benefit out of it. But
                        if you're considering going down that road, it's important to realize that you're never going to get there
                        without being good at data binding. Data binding is the most important aspect of being able to decouple the
                        Views and ViewModels and the data flow and communication between those, because the bindings form the bond
                        between the View and its ViewModel in a loosely coupled way.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Data Access vs Data Binding</h3>
                    <p>
                        Now one concept I want to clear up, up front, is the difference between data access vs data binding, because
                        there's common misconceptions here. Data access is all about data that sits in a persistent store, and being
                        able to load that data into some in-memory data source object. Data access is about retrieving data into those
                        data source objects in-memory from the persistent store and being able to write changes back out to the
                        persistent store. That persistent store could be a relational database, it could be flat files or it could
                        even be a service that you're making web service calls out to, but conceptually you're reading data in from a
                        persistent store and writing it out and putting it into objects in-memory.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-001.png"/>
                        <figcaption>Fig 01-001</figcaption>
                    </figure>
                    <p>
                        Data binding, on the other hand, sits upstream of data access, so your initial focus is going to be on a
                        screen that you're trying to support. It could be a Window or a User Control or a View in conceptual terms
                        that you have a set of elements on that you're going to put data into, and you need to flow data into those
                        element properties to present it on screen. To do that, you need objects in memory, so you have these data
                        source objects that came from somewhere and you're going to read data in from those data source objects into
                        elements on the screen, and if those elements are editable, then you're going to allow data to be written back
                        into those data source objects when it changes on screen. From data binding's perspective, it shouldn't know
                        or care where those data source objects came from or even be coupled to what kind of object they are.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-002.png"/>
                        <figcaption>Fig 01-002</figcaption>
                    </figure>
                </div>
                <div class="panel-body">
                    <h3>Sources and Targets</h3>
                    <p>
                        Another key concept and some terminology when you're dealing with Data Binding are the concepts of Sources and
                        Targets. Ultimately, when you're doing data binding, you have some data object that you're going to get some
                        data out of that exposes properties, and those properties can be collections of individual objects, they can
                        be a single complex object or they can be properties exposing primitive values, and you want to data bind
                        those to different elements within your screen.
                    </p>
                    <p>
                        So, for example, we want data to flow from the Customers property on our data object into a ComboBox, and
                        populate its drop-down list. We want to have a complex object property called SelectedCustomer in this case,
                        bound to a collection of elements somewhere in our screen, in this case a FirstName field, LastName field, and
                        Email field, come off of individual properties on that SelectedCustomer property. And then we might also have
                        another collection down here, Orders, that's going to flow into a DataGrid and provide the data source for
                        that DataGrid.
                    </p>
                    <p>
                        When you view Data Binding like this, it should become clear that the data object is the Source object and the
                        elements on the screen are the Targets of the bindings. Now the bindings get declared on the Target element
                        and point to the Source object that's going to feed them. So at a high level, Data Binding basically flows
                        data between the Source object property and the Target element property, discrete values that are going to
                        flow back and forth, where those values can be a single primitive value, they can be a complex object or they
                        can be an entire collection of complex objects.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-003.png"/>
                        <figcaption>Fig 01-003</figcaption>
                    </figure>
                    <p>
                        Now it's important to note that the terms Source and Target can get a little confusing because in Two-Way Data
                        Binding those fields on the screen may be editable, and if you have two-way binding enabled, those arrows can
                        reverse and allow data to flow from the Target down into the Source object. The names don't change at that
                        point. The Source is still the Source, the Target is still the Target, in Data Binding terms, but just realize
                        that the flow reverses in the case of two-way data binding when edits are made in the screen.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-004.png"/>
                        <figcaption>Fig 01-004</figcaption>
                    </figure>
                    <p>
                        So another key thing to keep in mind is that the target properties of a binding must be DependencyProperties.
                        That typically means that they are a property defined on a framework element that's part of the WPF framework,
                        but they could be custom DependencyProperties on your own objects, but the thing you hook the binding up to
                        directly is going to be a DependencyProperty. The S ource object property does not have to be a
                        DependencyProperty.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Data Binding Building Blocks</h3>
                    <p>
                        Now let's talk about the basic building blocks that you're going to use when Data Binding. The first thing is
                        DataContext. DataContext is a property that each framework element has that can be used to flow data into the
                        screen, so for some screen of data that you want to hook Data Binding up to, you can think of it as a
                        DataContext overlays that screen and provides ambient data to all of the elements within the screen.
                    </p>
                    <p>
                        From a structural perspective, it's really that you can set a DataContext property on any element and that
                        DataContext flows down to all of the child elements that sit underneath it. So if we set the DataContext to
                        the Window level, all of the child elements within that Window will have access to the same object that was
                        set as the DataContext on the root Window element.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-005.png"/>
                        <figcaption>Fig 01-005</figcaption>
                    </figure>
                    <p>
                        The next concept are Bindings. Bindings provide the glue between the single element property, such as the Text
                        property on a TextBox and a Source object property such as the FirstName property on a Customer. Bindings
                        allow you to read data in from the Source object property into the Target element property, and in Two-Way
                        Data Binding you can also flow data back from the Target element property back into the Source object
                        property.
                    </p>
                    <figure><img src="./images/wpfdatabindingindepth/Fig01-006.png"/>
                        <figcaption>Fig 01-006</figcaption>
                    </figure>
                    <p>
                        Another important concept to do with binding is the way XAML parsing works. If you have some chunk of XAML
                        that's going to be rendered on the screen, the XAML parser is going to kick in and start ripping through that
                        XAML. Conceptually it's top to bottom and left to right, and it's newing up objects and setting properties on
                        those objects. As it rips through that XAML, it's going to find Bindings and when it first finds a Binding, it
                        goes ahead and does the initial evaluation of that Binding, figures out what the Source object is, it
                        dereferences a property, gets a value out of that Source object property, and puts it into the Target element
                        property that the Binding is sitting on.
                    </p>

                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-007.png"/>
                        <figcaption>Fig 01-007</figcaption>
                    </figure>
                    <p>
                        Next there's the concept of Change Notifications. Change Notifications are important because if the data can
                        change behind the scenes, you want the View to stay in sync with the real state of the data. So if you have
                        some field and it's Data Bound to some Source object property, if the Source object property changes, an Event
                        can fire and it can notify the Binding that's up in the View, and that Binding will know to go and re-retrieve
                        the value and update the View to stay in sync. Likewise, as the data changes in the View, the Target property
                        can raise Change Notifications, which can trigger the Binding to push the value back down into the Source
                        object property. So it's these Change Notifications that allow your real data behind the scenes to stay in
                        sync with what the user sees in the screen.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-008.png"/>
                        <figcaption>Fig 01-008</figcaption>
                    </figure>
                </div>
                <div class="panel-body">
                    <h3>DataContexts and Scopes</h3>
                    <p>
                        When it comes to working with DataContext, it's important to understand the way DataContext form a scoping
                        mechanism. So as I described before, you can set the DataContext at a Window level. You just set the
                        DataContext property on that Window object to some Source data object, and that becomes the ambient data
                        source for all of the child elements within that Window.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-009.png"/>
                        <figcaption>Fig 01-009</figcaption>
                    </figure>
                    <p>
                        However, you can also set a DataContext at a more granular level. So in this example I could set a DataContext
                        for the DataGrid and the data entry form below it to a Collection of Customers, and that ambient source of
                        data is just applying to those elements based on some containing element that we set the DataContext on, and
                        any Bindings within that scope, by default, are going to be using that DataContext as their Source objects.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-010.png"/>
                        <figcaption>Fig 01-010</figcaption>
                    </figure>
                    <p>
                        Now when it comes to DataBound List controls, it's important to realize that they will dynamically set a
                        DataContext of their own. A DataGrid, for example, as it goes and renders out each row, each row is composed
                        of a set of child elements and what it will do is set the DataContext for the container of those child
                        elements to the object that it's rendering out, the row object. So in this case, this is a grid full of
                        Orders, the overall DataContext is going to be a Collection of Orders, but the DataContext for each row is
                        going to be an individual Order object. And that means the Bindings on the columns themselves, for example,
                        can just bind to the properties of a single Order object, they don't have to know which particular Order
                        object they're rendering out.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-011.png"/>
                        <figcaption>Fig 01-011</figcaption>
                    </figure>
                    <p>
                        You can also set a DataContext in a more granular fashion to a set of elements. And you would do that by
                        setting the DataContext property on some containing element such as a Grid or StackPanel. Then, as discussed
                        before, that DataContext flows down to all child elements. That means these individual TextBoxes will have
                        that DataContext as a Customer object in this case, and they can just Data Bind to the properties on that
                        Customer object without needing to know about what the DataContext is for the rest of the form.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-012.png"/>
                        <figcaption>Fig 01-012</figcaption>
                    </figure>
                    <p>
                        And finally, you could set it for an individual element. It's fairly rare that you would set DataContexts at
                        that granular of level, although I will do it in the demos just to show how it works.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-013.png"/>
                        <figcaption>Fig 01-013</figcaption>
                    </figure>
                </div>
                <div class="panel-body">
                    <h3>Demo Intro</h3>
                    <p>
                        So now let's finally get to some code that demonstrates all these fundamentals. I'm going to go through a
                        series of demos starting with a data-driven form that has no data binding and talking about what the structure
                        of the code needs to be when there's no data binding present.
                    </p>
                    <p>
                        Then we'll transform that same thing and show how to hook up data binding and show what some of the benefits
                        are in terms of the code that you write, and we'll show how to do data binding to label a TextBox, a ListBox,
                        and a DataGrid.
                    </p>
                    <p>
                        Then in the final demo we'll clean that up a bit and show how you can, instead of setting a number of
                        different DataContexts for different parts of the form, you can aggregate those objects into a single
                        DataContext object. I call this Poor man's MVVM here. In the demo I'll be calling it a ViewModel, but the
                        ViewModel I'm using here doesn't follow a number of other tenets of MVVM that you can learn in other courses
                        such as my Windows 8 MVVM course. So let's dive right into some coding.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-014.png"/>
                        <figcaption>Fig 01-014</figcaption>
                    </figure>
                </div>
                <div class="panel-body">
                    <h3>Demo: Data Forms with No Data Binding</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-001" class="form-control" type="text" value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\before\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn" >
                	        <button class="btn" data-clipboard-target="#Ex02-001">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-002" class="form-control" type="text" value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\after\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex02-002">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <p>
                        In this first demo I want to review some of the data binding fundamentals before we dive into more advanced
                        aspects throughout the rest of the course. The data model we'll be dealing with throughout the course is based
                        around a pizza ordering company. So we have Customers as a primary object, Customers have Orders, Orders have
                        OrderItems, OrderItems are related to Products, Orders have an Order Status, and we probably won't get much
                        deeper than that in the data model for the demos that we'll be doing. Now you can see in this demo I'm using
                        an Entity Framework Database First edmx data model, partly so you can visualize the schema here. In later
                        demos I'll mostly be using Entity Framework Code First.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-015.png"/>
                        <figcaption>Fig 01-015</figcaption>
                    </figure>
                    <p>
                        The UI that we'll be using in this demo is a simple crude data form here. At the top we have some current
                        Customer information, a Customer ID has a Label and a Customer Name has a TextBox. Then we have a Recent
                        Orders List, which is a ListBox that's going to be populated with dates, and when we select a date there, down
                        at the bottom in the DataGrid we're going to see the Order items associated with that Order. We've got a Save
                        button here so that we can modify the Customer Name and save it off to the database. And we'll add some other
                        fields as we go here to save off other modifications to the Customer.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-016.png"/>
                        <figcaption>Fig 01-016</figcaption>
                    </figure>
                    <p>
                        Now really a good starting point when it comes to considering Data Binding is to think about what does the
                        code need to be to support a data form like this when you don't have Data Binding. If we drop into the
                        code-behind here, we can see that we've got our MainWindow, we're newing up an instance of our object context,
                        our data model, we've got a Loaded event handler hooked up:
                    </p>
                    <figure>
<pre class="prettyprint"><code>public partial class MainWindow : Window
{
    ZzaEntities _ZzaContext = new ZzaEntities();

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
    }</code></pre>
                        <figcaption>Fig 01-017</figcaption>
                    </figure>
                    <p>
                        In that event handler we go out through our object context, execute a query to get the first Customer in the
                        Customer's Collection.
                    </p>
                    <figure>
<pre class="prettyprint"><code>void MainWindow_Loaded(object sender, RoutedEventArgs e)
{

    var firstCustomer = _ZzaContext.Customers.FirstOrDefault();
    CustomerIdLabel.Content = firstCustomer.Id;
    CustomerLastNameTextBox.Text = firstCustomer.LastName;

    var orderDates = _ZzaContext.Orders
        .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
    OrdersList.ItemsSource = orderDates;

}</code></pre>
                        <figcaption>Fig 01-018</figcaption>
                    </figure>
                    <p>
                        Then comes the part that gets really tedious about not using Data Binding is we have to go field by field and
                        grab out values of properties on our data object, our Customer in this case, and push them into properties on
                        the corresponding elements in our UI, such as the Content property on a Label or the Text property on a
                        TextBox.
                    </p>
                    <figure>
<pre class="prettyprint"><code >CustomerIdLabel.Content = firstCustomer.Id;
CustomerLastNameTextBox.Text = firstCustomer.LastName;
</code></pre>
                        <figcaption>Fig 01-019</figcaption>
                    </figure>
                    <p>Next you can see I'm executing a query to go get the Orders for that current Customer and selecting just the
                        OrderDate so we end up with a list of DateTime objects that we set as the ItemsSource property on our ListBox.
                    </p>
                    <figure>
<pre class="prettyprint"><code>var orderDates = _ZzaContext.Orders
    .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
OrdersList.ItemsSource = orderDates;</code></pre>
                        <figcaption>Fig 01-020</figcaption>
                    </figure>
                    <p>
                        We also have a SelectionChanged event handler hooked up to the ListBox, and that's down here. And here you can
                        see we're basically going out and executing a query against the database to go to the Orders collection, get
                        the related child OrderItems, and using a Select criteria that the OrderDate matches the one selected in the
                        ListBox and the CustomerId matches the one that is the current Customer based on our CustomerIdLabel.
                    </p>
                    <figure>
<pre class="prettyprint"><code>void OnOrderSelected(object sender, SelectionChangedEventArgs args)
{
    var selectedOrder = _ZzaContext.Orders.Include("OrderItems")
        .Where(o => o.OrderDate == (DateTime)OrdersList.SelectedItem &&
            o.CustomerId == (Guid)CustomerIdLabel.Content).FirstOrDefault();
    OrderItemsDataGrid.ItemsSource = selectedOrder.OrderItems;
}</code></pre>
                        <figcaption>Fig 01-021</figcaption>
                    </figure>
                    <p>
                        You can see one of the downsides to doing it this way is that things like SelectedItem and Content are
                        declared as objects, so they can contain anything, so you end up having to do a lot of casting as you move
                        things in and out of those control properties. Once we have the OrderItems, we put those as the ItemsSource on
                        our DataGrid to drive that.
                    </p>
                    <p>
                        And then for our Save button you can see that we're going out and going and re-retrieving that Customer based
                        on the CustomerId. We could have, likewise, held onto that Customer after we retrieved it in a form member
                        variable.
                    </p>
                    <figure>
<pre class="prettyprint"><code>private void OnSave(object sender, RoutedEventArgs e)
{
    var customer = _ZzaContext.Customers.Where(c => c.Id == (Guid)(CustomerIdLabel.Content)).FirstOrDefault();
    customer.LastName = CustomerLastNameTextBox.Text;
    // Get all the other editable field values...
    //customer.FirstName = CustomerFirstNameTextBox.Text;
    //customer.Email = CustomerEmailTextBox.Text;
    //customer.Phone = CustomerPhoneTextBox.Text;
    // ...
    // Persist those changes somewhere
    _ZzaContext.SaveChanges();
}</code></pre>
                        <figcaption>Fig 01-022</figcaption>
                    </figure>

                    <p>
                        Once we have the Customer, now we have to do some pulling of values from individual properties on the controls
                        in the UI, and putting those into individual properties on the Customer object, and then eventually going off
                        and saving. And the comments are here just to emphasize that you have to do this on a property by property
                        basis for your entity because of the fact that you're just pushing and pulling discrete values into the
                        properties of controls on the UI.
                    </p>
                    <p>
                        But with that code in place we can, in fact, run this form and we can see we have our current Customer at the
                        top. We can modify that Customer. I'll get rid of the 42 here, click Save, close the form, start the app back
                        up, and our modification was, in fact, persisted.
                    </p>
                    <p>
                        When we select an Order, we get the table populated down below. Now there's some nasty stuff there because
                        it's doing auto-generate columns, so we're getting these related objects, just getting dumped with their type
                        information. Here's the meaningful OrderItem information over here with the related IDs, quantities, unit
                        prices, and so on, and we can see that that changes based on the selection up above. So the good news is it's
                        fully functional, but we have to do all this pushing and pulling of values in our UI, and you'll see that we
                        can be a lot more efficient by Data Binding. So in the next demo, we'll see how this can get better by using
                        Data Binding instead.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-023.png"/>
                        <figcaption>Fig 01-023</figcaption>
                    </figure>
                </div>
                <div class="panel-body">
                    <h3>Demo: Data Binding Basics</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-003" type="text" class="form-control" value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\before\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn">
                                <button class="btn" data-clipboard-target="#Ex02-003">
                                    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                                </button>
        	                </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-004" type="text" class="form-control"  value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\after\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn">
                                <button class="btn" data-clipboard-target="#Ex02-004">
                                    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                                </button>
        	                </span>
                        </div>
                    </div>
                    <p>
                        So now let's look at how we can start cleaning up this demo by introducing Data Binding. First we're going to
                        go in here to the XAML of our Window and start pulling values into the XAML instead of pushing things from the
                        code-behind.
                    </p>

                    <p>So first we'll go to our CustomerIdLabel here:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Label x:Name="CustomerIdLabel"
   Grid.Row="0"
   Grid.Column="1"
   Content="{Binding Id}" /&gt;</code></pre>
                        <figcaption>Fig 01-023A</figcaption>
                    </figure>

                    <p>and we'll introduce a Binding for the Content property that says go and get me the Id property of whatever my
                        DataContext is. So whenever you see a Binding that just has one thing next to it, that one thing next to it is
                        the Path or the property name on the DataContext object that flows down to this. And we talked about
                        DataContext in the slides and we'll see that we're going to set it from the code-behind in a moment, but
                        DataContext is an overall ambient data object that flows down the visual tree and is accessible for Data
                        Binding on elements. So this implies that for this Label, at least, there has to be a DataContext object that
                        has an Id property on it, and the Binding is going to grab that value and put it into the content property for
                        us.
                    </p>
                    <p>
                        Likewise, we can go down to our TextBox here and put Text="(Binding LastName)". So it's the Text property that
                        we want to set, that's the Target. On the Source object we're expecting there to be a LastName property and
                        that Source object has to be set as the DataContext for this TextBox.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;TextBox x:Name="CustomerLastNameTextBox"
    Grid.Row="1"
    Grid.Column="1"
    Text="{Binding LastName}" /&gt;</code></pre>
                        <figcaption>Fig 01-024</figcaption>
                    </figure>
                    <p>
                        Next, for our ListBox, we can drop down here and we can do a Binding like this:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ListBox x:Name="OrdersList"
     Grid.Row="2"
     Grid.Column="1"
     Height="100"
     ItemsSource="{Binding}"
     SelectionChanged="OnOrderSelected" /&gt;</code></pre>
                        <figcaption>Fig01-025</figcaption>
                    </figure>

                    <p>Ultimately we need to get a Collection into our ItemSource property and we can just use Binding here and that
                        basically says, I'm expecting the DataContext for this ListBox to be a Collection of something I'm going to
                        present. And by default, it will call ToString on each one of those objects if we don't do anything else here.
                        So if you remember from the previous run, we're expecting a list of Order Dates here. We can put a list of
                        Order Dates and it will call ToString on each of those and we'll see the date rendered as text, but Binding on
                        its own like this:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>ItemsSource="{Binding}"</code></pre>
                        <figcaption>Fig01-025A</figcaption>
                    </figure>
                    <p>implies that the Source object is the DataContext and that we're not looking for any particular property on
                        that DataContext, we're expecting it to be whole objects that we're pushing in as a Collection here.
                    </p>
                    <p>
                        Then we could drop down to the DataGrid and do the same thing:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid x:Name="OrderItemsDataGrid"
    ItemsSource="{Binding}"
    AutoGenerateColumns="True"
    Grid.Row="2"&gt;
&lt;/DataGrid&gt;</code></pre>
                        <figcaption>Fig01-026</figcaption>
                    </figure>

                    <p>Now this implies that this DataGrid's DataContext has to be set to whatever collection it expects to render
                        out, which in our case happens to be OrderItems. Now if you're experienced with data binding this may look a
                        little weird, because this implies that we have a different DataContext for the DataGrid:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid x:Name="OrderItemsDataGrid"
    ItemsSource="{Binding}"
    AutoGenerateColumns="True"
    Grid.Row="2"&gt;
&lt;/DataGrid&gt;</code></pre>
                        <figcaption>Fig01-026A</figcaption>
                    </figure>
                    <p>for the ListBox:</p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ListBox x:Name="OrdersList"
     Grid.Row="2"
     Grid.Column="1"
     Height="100"
     ItemsSource="{Binding}"
     SelectionChanged="OnOrderSelected" /&gt;</code></pre>
                        <figcaption>Fig01-026B</figcaption>
                    </figure>
                    <p>and for the customer-oriented controls up above:</p>
                    <figure>
<pre class="prettyprint"><code>&lt;Label x:Name="CustomerIdLabel"
    Grid.Row="0"
    Grid.Column="1"
    Content="{Binding Id}" /&gt;
&lt;Label Grid.Row="1"
    Grid.Column="0"
    Content="Customer Name" /&gt;
&lt;TextBox x:Name="CustomerLastNameTextBox"
    Grid.Row="1"
    Grid.Column="1"
    Text="{Binding LastName}" /&gt;</code></pre>
                        <figcaption>Fig01-026C</figcaption>
                    </figure>


                    <p>which is not something you'd normally do and we'll evolve past that quickly here in the demos.</p>
                    <p>
                        So now let's drop into the code-behind and what we could do is go in here after we've retrieved our first
                        Customer, we could switch things here to set the overall DataContext for the Window itself to that Customer
                        object. That means it's going to be set at the root level on the Window and it's going to flow down the visual
                        tree to all the elements within the window and that will be their available DataContext unless it is set to
                        something different at an element level.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>void MainWindow_Loaded(object sender, RoutedEventArgs e)
{

    var firstCustomer = _ZzaContext.Customers.FirstOrDefault();
    DataContext = firstCustomer;
    //CustomerIdLabel.Content = firstCustomer.Id;
    //CustomerLastNameTextBox.Text = firstCustomer.LastName;</code></pre>
                        <figcaption>Fig01-027</figcaption>
                    </figure>
                    <p>
                        For our OrderList, we could replace setting the ItemsSource directly with setting a DataContext for that list
                        because the ItemsSource is being set through the binding now that we added in the XAML.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>var orderDates = _ZzaContext.Orders
    .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
//OrdersList.ItemsSource = orderDates;
OrdersList.DataContext = orderDates;</code></pre>
                        <figcaption>Fig01-028</figcaption>
                    </figure>
                    <p>
                        And then down here in our OrderSelected handler we could do the same where we replace setting the ItemsSource
                        on the DataGrid with setting a DataContext that flows into it, and then the binding on the ItemsSource
                        property in the XAML will pick it up and render it.
                    </p>
                    <figure>
<pre class="prettyprint"><code> void OnOrderSelected(object sender, SelectionChangedEventArgs args)
    {
        var selectedOrder = _ZzaContext.Orders.Include("OrderItems")
            .Where(o => o.OrderDate == (DateTime)OrdersList.SelectedItem &&
                o.CustomerId == (Guid)CustomerIdLabel.Content).FirstOrDefault();
        //OrderItemsDataGrid.ItemsSource = selectedOrder.OrderItems;
        OrderItemsDataGrid.DataContext = selectedOrder.OrderItems;</code></pre>
                        <figcaption>Fig01-029</figcaption>
                    </figure>
                    <p>
                        The other thing we probably want to do is get rid of the ugly columns that we didn't intend to render in the
                        first place, so I'm going to drop down here to the DataGrid and say, AutoGenerateColumns "False" and add in
                        some column definitions that include just those columns that we want to do.
                    </p>
                    <figure>
                    <pre class="prettyprint"><code>      AutoGenerateColumns="False"
      Grid.Row="2">
    &lt;DataGrid.Columns&gt;
        &lt;DataGridTextColumn x:Name="idColumn"
                            Binding="{Binding Id}"
                            Header="Id"
                            Width="SizeToHeader" /&gt;
        &lt;DataGridTextColumn x:Name="instructionsColumn"
                            Binding="{Binding Instructions}"
                            Header="Instructions"
                            Width="Auto" /&gt;</code></pre>
                        <figcaption>Fig01-030</figcaption>
                    </figure>
                    <p>
                        Now the other thing to point out here in the XAML is the way DataContext work in list bound controls. So we've
                        got the DataGrid as a whole is being set to whatever the current DataContext is on that element, which we just
                        programmatically set in the code-behind to be an OrderItems collection. However, notice these bindings are
                        assuming their DataContext has properties like Id, Instructions, ProductId, and so on.
                    </p>
                    <figure>
                    <pre class="prettyprint"><code>      AutoGenerateColumns="False"
      Grid.Row="2"&gt;
    &lt;DataGrid.Columns&gt;
        &lt;DataGridTextColumn x:Name="idColumn"
                            Binding="{Binding Id}"
                            Header="Id"
                            Width="SizeToHeader" /&gt;
        &lt;DataGridTextColumn x:Name="instructionsColumn"
                            Binding="{Binding Instructions}"
                            Header="Instructions"
                            Width="Auto" /&gt;</code></pre>
                        <figcaption>Fig01-031</figcaption>
                    </figure>
                    <p>
                        That's because when a list-oriented control like a DataGrid, ListBox or ComboBox, renders out its items, it
                        sets the DataContext for the item being rendered to be the individual item. So in the case of a DataGrid, it's
                        rendering out a whole row with these columns in it, it sets the DataContext for that row object to be the
                        individual item in the Collection that it's rendering. So each of these, the DataContext is just a single
                        Order item, and therefore, their Binding Path can be equal to just the property names on that object.
                    </p>
                    <p>
                        The other thing to point out in review here is that when you see Binding Id here, this is 100% equivalent to
                        writing it this way.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGridTextColumn x:Name="idColumn"
    Binding="{Binding Path=Id}"
    Header="Id"
    Width="SizeToHeader" /&gt;</code></pre>
                        <figcaption>Fig01-032</figcaption>
                    </figure>
                    <p>
                        When you say Binding Id, you're really implicitly setting the Path through a parameterized constructor on the
                        binding object. So Binding Instructions here really mean set the path equal to Instructions, and we'll get to
                        other properties that the binding has in later modules.
                    </p>
                    <p>
                        So with that code in place, I can go ahead and run, and we can see our data has populated like before and our
                        selections happen and now we don't have the extra columns that we didn't want in the first place.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-033.png"/>
                        <figcaption>Fig 01-033</figcaption>
                    </figure>
                    <p>
                        So if we drop into the code-behind here we can clean up those commented lines of code.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSave(object sender, RoutedEventArgs e)
{
    //var customer = _ZzaContext.Customers.Where(c => c.Id == (Guid)(CustomerIdLabel.Content)).FirstOrDefault();
    //customer.LastName = CustomerLastNameTextBox.Text;
    // Get all the other editable field values...
    // Persist those changes somewhere
    _ZzaContext.SaveChanges();
}</code></pre>
                        <figcaption>Fig01-034</figcaption>
                    </figure>

                    <p>
                        The other thing to point out here is that in the OnSave method we don't have to do all this work to pull
                        individual values from controls and put them into properties on an object because the object we set as the
                        DataContext is being tracked, in our case, by Entity Framework and it knows about those properties changed,
                        because the whole object was set as the DataContext and when we're changing those properties, Entity Framework
                        is raising property Change Notifications and it knows about those. So we can simply go off and save changes
                        here and not have to do any pushing and pulling anymore.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void OnSave(object sender, RoutedEventArgs e)
{
    _ZzaContext.SaveChanges();
}</code></pre>
                        <figcaption>Fig01-035</figcaption>
                    </figure>
                    <p>
                        So I can go ahead and run, I can modify Pucket's name, Save, shut down, and restart, and we can see those
                        changes were persisted. Now for just one editable field here, it doesn't really pay huge dividends to the Data
                        Binding, but where it starts to become really apparent is when you have a big data entry form with lots of
                        fields. So let's go up here and add a few more rows to our grid and we'll add a few more data entry forms for
                        other properties on a customer
                    </p>
                    <figure>
<pre class="prettyprint"><code>&lt;Label Grid.Row=&quot;1&quot;
    Grid.Column=&quot;0&quot;
    Content=&quot;Customer Last Name&quot; /&gt;
&lt;TextBox Text=&quot;{Binding LastName}&quot;
    Grid.Row=&quot;1&quot;
    Grid.Column=&quot;1&quot; /&gt;
&lt;Label Grid.Row=&quot;2&quot;
    Grid.Column=&quot;0&quot;
    Content=&quot;Customer First Name&quot; /&gt;
&lt;TextBox Text=&quot;{Binding FirsName}&quot;
    Grid.Row=&quot;2&quot;
    Grid.Column=&quot;1&quot; /&gt;
&lt;Label Grid.Row=&quot;3&quot;
    Grid.Column=&quot;0&quot;
    Content=&quot;Customer Phone&quot; /&gt;
&lt;TextBox Text=&quot;{Binding Phone}&quot;
    Grid.Row=&quot;3&quot;
    Grid.Column=&quot;1&quot; /&gt;
&lt;Label Grid.Row=&quot;4&quot;
    Grid.Column=&quot;0&quot;
    Content=&quot;Customer Email&quot; /&gt;
&lt;TextBox Text=&quot;{Binding Email}&quot;
    Grid.Row=&quot;4&quot;
    Grid.Column=&quot;1&quot; /&gt;</code></pre>
                        <figcaption>Fig01-036</figcaption>
                    </figure>
                    <p>
                        So now we're binding to the customer LastName, FirstName, Phone, and Email in individual TextBoxes and we
                        don't have to make any modifications to the code-behind now because the code-behind is just pushing a whole
                        customer object into the DataContext and it will flow down to all of these bindings. So we could run, we could
                        modify First Name, Last Name, Customer Phone, Save our changes, shut down, and restart, and all those changes
                        have been persisted.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-037.png"/>
                        <figcaption>Fig 01-037</figcaption>
                    </figure>
                    <p>
                        So now you just get to focus on the markup and deciding how do you want to render something and what is the
                        property on the DataContext that's going to give you that data.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Demo: Consolidating DataContexts</h3>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-004" class="form-control" type="text" value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\before\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex02-004">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>
                    <div class="example">
                        <div class="input-group">
                            <input id="Ex02-005" class="form-control" type="text" value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 2\after\DataBindingBasics\DataBindingBasics.sln">
                            <span class="input-group-btn">
                	        <button class="btn" data-clipboard-target="#Ex02-005">
                        	    <img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard">
                            </button>
        	            </span>
                        </div>
                    </div>

                    <p>
                        Now one thing that's kind of inefficient in the previous demo in the way we are doing things is we're setting
                        the DataContext multiple times for individual controls. So here we're setting the DataContext of the window as
                        a whole to be a customer, but then we have to set a separate DataContext on the ListBox and a separate
                        DataContext on the DataGrid itself.
                    </p>
                    <figure>
<pre class="prettyprint"><code>public MainWindow()
{
    InitializeComponent();
    Loaded += MainWindow_Loaded;
}

void MainWindow_Loaded(object sender, RoutedEventArgs e)
{

    var firstCustomer = _ZzaContext.Customers.FirstOrDefault();
    DataContext = firstCustomer;

    var orderDates = _ZzaContext.Orders
        .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
    OrdersList.DataContext = orderDates;
}</code></pre>
                        <figcaption>Fig01-038</figcaption>
                    </figure>
                    <p>
                        Generally when you're doing data binding you're going to try to aggregate all of the objects needed to support
                        a given screen onto some single object you can set as a DataContext, and that kind of leads to the MVVM
                        pattern, the Model-View-ViewModel pattern. Now I'm not really going to go into any detail on MVVM,
                        Model-View-ViewModel in this course because I want to emphasize that everything about data binding you can
                        leverage, even if you don't embrace the MVVM pattern or perhaps you go do MVC or MVP as other patterns you
                        could use, data binding can still help you out there. But just to show a very lightweight form of MVVM is, if
                        we declared an instance of a main window ViewModel here and we go look in the code. And this thing is actually
                        already defined, and you can see it has the Customer that we need for part of the screen, order dates that we
                        need for another part of the screen, and OrderItems that we need for another part of the screen, all just
                        exposed as properties on that ViewModel.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>namespace DataBindingBasics
{
    public class MainWindowViewModel
    {
        public Customer Customer { get; set; }
        public List&lt;DateTime&gt; OrderDates { get; set; }
        public List&lt;OrderItem&gt; OrderItems { get; set; }
    }
}</code></pre>
                        <figcaption>Fig01-039</figcaption>
                    </figure>

                    <p>
                        Now when you really do MVVM you're generally going to encapsulate down on your ViewModel the interaction logic
                        and also the data loading and saving kind of logic inside of the ViewModel and get that out of the code-behind
                        so it's more testable, but at a minimum here, to support a little bit better data binding you need to
                        aggregate all the data the screen needs on a single object so that you can set an instance of that single
                        object as your DataContext.
                    </p>

                    <p>
                        So if we go modify the code a little bit more, we've got this instance of the ViewModel available to us now.
                        Once we get our first Customer we'll set that as the Customer property on the ViewModel and we'll get rid of
                        this DataContext setting
                    </p>
                    <figure>
                <pre class="prettyprint"><code>var firstCustomer = _ZzaContext.Customers.FirstOrDefault();
_ViewModel.Customer = firstCustomer;
DataContext = firstCustomer;</code></pre>
                        <figcaption>Fig01-040</figcaption>
                    </figure>
                    <p>
                        And then once we have our OrderDates we'll set those as the OrderDates property on the ViewModel and down
                        below in our Order selected we can set the OrderItems property on the ViewModel to that set of OrderItems for
                        the current Order.
                    </p>
                    <figure>
                <pre class="prettyprint"><code> void MainWindow_Loaded(object sender, RoutedEventArgs e)
{

    var firstCustomer = _ZzaContext.Customers.FirstOrDefault();
    _ViewModel.Customer = firstCustomer;

    var orderDates = _ZzaContext.Orders
        .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
    _ViewModel.OrderDates = orderDates;


void OnOrderSelected(object sender, SelectionChangedEventArgs args)
{
    var selectedOrder = _ZzaContext.Orders.Include("OrderItems")
        .Where(o => o.OrderDate == (DateTime)OrdersList.SelectedItem &&
            o.CustomerId == (Guid)CustomerIdLabel.Content).FirstOrDefault();
    _ViewModel.OrderItems = selectedOrder.OrderItems.ToList();
 </code></pre>
                        <figcaption>Fig01-041</figcaption>
                    </figure>
                    <p>
                        Now all we need to do is set the DataContext as a whole to an instance of that ViewModel. Now that DataContext
                        will be set at a window level and it'll flow down to all of the child controls.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>var orderDates = _ZzaContext.Orders
    .Where(o => o.CustomerId == firstCustomer.Id).Select(o => o.OrderDate).ToList();
_ViewModel.OrderDates = orderDates;
DataContext = _ViewModel;</code></pre>
                        <figcaption>Fig01-042</figcaption>
                    </figure>
                    <p>
                        That implies that we need to change some of the bindings over here in our XAML. So first off, each of these
                        bindings for Customer I could prefix with Customer. and it would go to that ViewModel.Customer to get the
                        object and then get to the LastName property on there, and then I'd have to say Customer.FirstName down here,
                        and so on.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Label Grid.Row="1"
   Grid.Column="0"
   Content="Customer Last Name" />
&lt;TextBox Text="{Binding Customer.LastName}"
   Grid.Row="1"
   Grid.Column="1" /&gt;</code></pre>
                        <figcaption>Fig01-043</figcaption>
                    </figure>
                    <p>
                        Another way I could do the same thing is, because all these controls are grouped inside of this grid, I could
                        just go to the grid and set the DataContext to the grid using a binding to the Customer property on our
                        ViewModel
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;Grid DataContext="{Binding Customer}"&gt;
    &lt;Grid.ColumnDefinitions&gt;
        &lt;ColumnDefinition Width="Auto" /&gt;
        &lt;ColumnDefinition Width="*" /&gt;
    &lt;/Grid.ColumnDefinitions&gt;
    &lt;Grid.RowDefinitions&gt;
        &lt;RowDefinition Height="Auto" /&gt;
        &lt;RowDefinition Height="Auto" /&gt;
        &lt;RowDefinition Height="Auto" /&gt;
        &lt;RowDefinition Height="Auto" /&gt;
    &lt;/Grid.RowDefinitions&gt;</code></pre>
                        <figcaption>Fig01-044</figcaption>
                    </figure>
                    <p>
                        So it basically grabs that object reference, sets it as DataContext, and everything under this grid now will
                        just see the Customer, not the ViewModel.
                    </p>
                    <p>
                        Then I could go down to my ListBox and change the Binding to point to the OrderDates property on the
                        ViewModel:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;ListBox x:Name="OrdersList"
    ItemsSource="{Binding OrderDates}"
    Grid.Row="0"
    Grid.Column="1"
    Height="100"
    SelectionChanged="OnOrderSelected" /></code></pre>
                        <figcaption>Fig01-045</figcaption>
                    </figure>
                    <p>
                        And go down to the DataGrid and change that one to point to the OrderItems.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid x:Name="OrderItemsDataGrid"
    ItemsSource="{Binding OrderItems}"
    AutoGenerateColumns="False"
    Grid.Row="2"&gt;
&lt;DataGrid.Columns&gt;</code></pre>
                        <figcaption>Fig01-046</figcaption>
                    </figure>


                    <p>
                        Now if we go ahead and run, you can see we've got the same kind of experience up at the top as we had before
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-047.png"/>
                        <figcaption>Fig 01-047</figcaption>
                    </figure>
                    <p>
                        But notice when I'm making selections in the OrderDate list we've got a problem, it's not actually doing
                        anything down below. You can see that we are still setting the OrderItems property here when an order
                        selection happens. So what's the issue there? Well it kind of leads into our next module and working with data
                        sources, but the problem is that we're setting this OrderItems property and this is a normal property and it
                        doesn't raise any kind of change notification. So even though the value of that property has changed, when our
                        event handler fires, the Data Binding doesn't know anything about it.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>public Customer Customer { get; set; }
public List&lt;DateTime&gt; OrderDates { get; set; }
public List&lt;OrderItem&gt; OrderItems { get; set; }</code></pre>
                        <figcaption>Fig01-048</figcaption>
                    </figure>

                    <p>
                        Now as a quick workaround and to show you something we'll cover later in the course, we could force it to
                        update. If you've worked with older technologies like Windows Forms, you may have seen methods called
                        Invalidate, and variations on that, that force the form to re-render itself. This is kind of the Data Binding
                        equivalent of that and you generally don't want to do this, but I just want to expose it as a quick workaround
                        at this point.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>OrderItemsDataGrid.GetBindingExpression(DataGrid.ItemsSourceProperty)
                    .UpdateTarget();</code></pre>
                        <figcaption>Fig01-049</figcaption>
                    </figure>
                    <p>
                        We can go to the DataGrid itself, we can use a method called GetBindingExpression that we pass a reference to
                        a DependencyProperty exposed on that. So the ItemsSourceProperty that we were setting is actually a
                        DependencyProperty on the DataGrid. And when we say GetBindingExpression it goes to that DependencyProperty
                        and gets the underlying binding that's setting it. So you're effectively getting a reference to this binding
                        object here.
                    </p>
                    <figure>
                <pre class="prettyprint"><code>&lt;DataGrid x:Name="OrderItemsDataGrid"
    ItemsSource="{Binding OrderItems}"
    AutoGenerateColumns="False"
    Grid.Row="2"&gt;
&lt;DataGrid.Columns&gt;</code></pre>
                        <figcaption>Fig01-050</figcaption>
                    </figure>
                    <p>
                        Then on that binding object there is a method exposed called UpdateTarget. And remember the terminology of
                        Source and Target, Source is the underlying data source object, which is our ViewModel here, Target is the
                        property on the element that's being set. So by saying UpdateTarget here, it's forcing it to grab the current
                        value out of the source and set it again on the target and that forces the UI to update.
                    </p>
                    <p>
                        So with that in place, we can run, we can make our selections, and down at the bottom you can see the grid is
                        updating even though our layout's not that great now.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig01-051.png"/>
                        <figcaption>Fig 01-051</figcaption>
                    </figure>
                    <p>
                        So that code will work, but it's not very efficient. We'll see in the next module the better way to do this is
                        to support INotifyPropertyChanged and collection Change Notifications from your data bound objects.
                    </p>
                </div>
                <div class="panel-body">
                    <h3>Summary</h3>
                    <p>
                        Alright, so wrapping up this first module, we covered a number of key concepts and some good demos of some
                        fundamentals. We started off by talking about the motivations of using data binding, which mostly center
                        around the way it lets you write more loosely coupled and well-structured code that can facilitate the
                        developer-designer interaction and can also enable separation patterns such as MVVM. Even if you don't do
                        those things, it lets you write less code and more maintainable code.
                    </p>
                    <p>
                        We talked about the concepts of Sources and Targets and the way data flows between them. Sources are your
                        behind-the-scenes objects that feed data to the screen. Targets are the elements within your screen that are
                        going to present the data. We covered the DataContext and talked about the way it acts as a scoping mechanism
                        for data that you're going to flow into the view. And then we talked about the bindings themselves and how
                        they're used to tie a Source property to a Target property and flow data between those two. We saw some basic
                        demos that showed how a data-driven form works with and without Data Binding, and what some of the basic
                        coding patterns are around setting up a DataContext and declaring your Bindings.
                    </p>
                    <p>
                        In the rest of the course, we'll get a lot deeper into all of those aspects including different kinds of data
                        source objects that you can use and how to structure that in your Views, all the different options that are
                        available on your Bindings to do more advanced things, things like how to validate your data, and so on. So
                        continue on to continue your journey to becoming a data binding ninja.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WPFDatabindingInDepth03DataSources"
    }
</script>

<style scoped>

</style>