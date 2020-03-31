<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Applied MVVM Part 1 – Hierarchies and Navigation</h2>
        </div>
        <div class="panel-body">
          <h2>Overview</h2>
          <p>
            We will now start building out a few more fully functional use cases from start to finish. In doing so we
            will hit on a number of other design considerations and things you will need to know how to tackle when
            using the MVVM pattern. We will start with a few concepts first including:
          </p>
          <ul>
            <li>Naming and Location of Components</li>
            <li>Hierarchical MVVM and how it ties in with Navigation where compose your app from hierarchies of Views
              and ViewModels.
            </li>
            <li>From there we'll dive straight into writing code and start building out several use cases for a Pizza
              order management app. We'll build out use cases including hierarchical MVVM and Navigation, getting some
              data on the screen in a listing and being able to switch to other Views and pass navigation parameters.
              That app development will continue into the next module as well as to finish out the rest of the course.
            </li>
          </ul>
          <h2>Naming MVVM Components</h2>
          <p>
            When it comes to naming components in software there are no correct names, only good or bad ones depending
            on who you talk to. What really matters is having a pattern and using it consistently.
          </p>
          <p>Most often your Views will be implemented as a UserControl that will be hosted or contained within some UI
            container or parent View.
          </p>
          <p>Some guidance when naming Views:</p>
          <p>
            Views should generally be named with a suffix of View with their name indicating what they contain or
            something about the action or use case that they support.
          </p>
          <p>
            You might also have cases where you are creating a top level construct such as a Window, Dialog or Page and
            you want to name the View with those as a suffix to indicate what kind of construct they are. This is
            absolutely fine.
          </p>
          <p>
            One recommendation is that you should avoid naming something with a View suffix if it does not have a
            corresponding ViewModel. That way you don’t have to dig into the internals of a View to figure out if it is
            part of a View/ViewModel pair.
          </p>
          <p>Some guidance when naming ViewModels:</p>
          <p>
            If you are following the above guidance on View naming, then simply apply Model to the end of the View name
            to create the ViewModel name (e.g. CustomerEditView/CustomerEditViewModel).
          </p>
          <p>If you have a View that’s name doesn't end in View, then append ViewModel to the end of the View name (e.g.
            MainWindow/MainWindowViewModel)
          </p>
          <p>
            Model objects are usually just objects with properties to contain the data of the Model. These kind of
            objects are often called entities but don’t let that term confuse you and make you think that they are
            necessarily associated with the Entity Framework in any way. Entity is just a general term for a lightweight
            object that contains data and properties.
          </p>
          <p>
            Name Model objects for the domain object that they represent. So your Model objects should have noun based
            names like Customer, Order, Patient, Prescription etc.
          </p>
          <p>
            One last thing to consider is what to name classes that are wrappers for model objects. For example, assume
            you are given the requirement to present an Order History for a Customer in a table consisting of the
            Product Name, the Order Date and the Quantity of that item:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000A.png"/>
            <figcaption>Fig 05-000A</figcaption>
          </figure>
          <p>But then you go look at your Model object definitions and realize that you need to get the Product Name
            from the Product object, the Order Date from the Order and the Quantity from the OrderItem but you need a
            collection of something you can easily bind to from a Grid. The solution, as discussed in the first module
            is to wrap your model objects in a separate type that is a helper to the ViewModel. Some people append
            ViewModel to the end of type names of these kinds of object but I recommeend you avoid that. Use some kind
            of entity name for the object and keep it so ViewModel's always have a View they are associated with. To
            keep things clean and easy to understand Wrapped Models should be kept in a different location to where the
            Models are defined – often side by side with the Views and ViewModels they are servicing.
          </p>
          <h2>Locating MVVM Components</h2>
          <p>
            When it comes to creating your MVVM components in your Solution structure there are no hard and fast rules
            here either. The two most common approaches are to locate your View and ViewModel components either in
            folders by type or folders by feature. When using folder by type you have sub folders foreach each type of
            construct one for Views:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000AB.png"/>
            <figcaption>Fig 05-000AB</figcaption>
          </figure>
          <p>
            and one for ViewModels:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000AC.png"/>
            <figcaption>Fig 05-000AC</figcaption>
          </figure>
          <p>
            When using folder by feature you have Views and ViewModels grouped into folders named for a feature area
            (e.g. Customers):
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000AD.png"/>
            <figcaption>Fig 05-000AD</figcaption>
          </figure>

          <p>
            or set of related use cases and the Views and ViewModels live side by side in that common folder and
            namespace.
          </p>
          <p>
            The problem with the folder by type approach for Views and ViewModels is that in a large complex app you
            could easily end up with dozens of files in those single folders making it hard to locate the type you are
            looking for. On the other hand, using folder by feature there are rarely more than half a dozen Views
            supporting any single feature area. This makes it a lot easier to find a particular View or ViewModel type.
          </p>
          <p>
            For your Model types and Client Services those types are often used across multiple features so using a
            folder by type for those typically makes sense:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000AE.png"/>
            <figcaption>Fig 05-000AE</figcaption>
          </figure>
          <p>In fact, in the majority of real applications out there the Model types were often in a separate library
            altogether:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000AF.png"/>
            <figcaption>Fig 05-000AF</figcaption>
          </figure>
          <p>
            because they were objects produced either through data access calls to a database or service calls to a back
            end web service and putting them in a separate class library makes it easier to share them with other parts
            of your architecture.
          </p>
          <h2>MVVM Hierarchies and Navigation</h2>
          <p>
            One of the last concepts to discuss briefly before we dive into the code is hierarchical MVVM and
            Navigation. When building an MVVM app you typically decompose complex screens of information into a set of
            Parent and Child Views where the Child Views are contained within the Parent Views in Panels or
            ContainerControls and they form a hierarchy of Views themselves:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000B.png"/>
            <figcaption>Fig 05-000B</figcaption>
          </figure>
          <p>
            When you do that not every piece of content that you separate into its own XAML file necessarily needs to be
            an MVVM View. If the chunk of content just provides the structure to render something to the screen and does
            not support any input or manipulation by the user for that content it may not warrant defining a separate
            ViewModel for it. It could just be a chunk of XAML that renders based on properties exposed by the parent's
            ViewModel
          </p>
          <p>
            However, if there is justification for having a ViewModel for a Child View then one way to structure things
            is to form a ViewModel hierarchy that mimics the View hierarchy and use ViewModel-First construction with
            Data Templates as the way to setup that hierarchy. We will implement this in the demos coming up shortly.
          </p>
          <p>
            Finally, if you have a hierarchy of Views and ViewModels the Parent ViewModel can become a hub for
            communications so that each Child ViewModel can remain decoupled from the other Child ViewModels and from
            their Parent as much as possible.
          </p>
          <h2>Demo Use Case Review</h2>
          <p>\DevelopmentTutorials\Pluralsight Courses\WPF MVVM In Depth\5Pluralsight Courses\WPF MVVM In
            Depth\ZzaDesktop-Start
          </p>
          <p>\DevelopmentTutorials\Pluralsight Courses\WPF MVVM In Depth\5Pluralsight Courses\WPF MVVM In
            Depth\ZzaDesktop-End
          </p>
          <p>
            Now it's time to dive into a series of demos that will span the rest of this module and carry on into the
            next. For those demos we are going to start with a set of end user use cases that form the requirements for
            what will be building out. Those use cases include:
          </p>
          <ul>
            <li>The ability to List Customers so that we can take certain actions on a given Customer:</li>
            <ul>
              <li>Placing Orders for a Customer</li>
              <li>Adding/Editing Customers</li>
            </ul>
            <li>We'll also have a separate notional requirement, just to show some navigation, that we need to have a
              separate part of our app that let's us monitor the order preparation process for all Customers to know
              when the order is :
            </li>
            <ul>
              <li>Queued</li>
              <li>Prepared</li>
              <li>Out for delivery</li>
            </ul>
          </ul>
          <p>Now to keep the length of this course reasonable and to avoid showing a bunch of repetitive coding
            techniques we're not going to fully flesh out all these use cases but we're going to use them as a framework
            of requirements to build out a series of demos in this module and the next to show how to build out some
            more realistic screens and interaction patterns. So let's get started.
          </p>
          <h2>Demo: Building Out an MVVM Hierarchy</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-001" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-001"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
            <input id="Ex05-002" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-End\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-002"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            In this demo we are going to start building up our set of use cases from scratch starting from an
            essentially empty WPF application project. We have already added the Zza.Data project which contains the
            DbContext that we are using for data access and the Model object definitions for our Data Model. This is
            referenced already from our WPF project.
          </p>
          <p>
            We also have our Services Layer with our CustomerRepository and OrderRepository that we have seen in
            previous demos. We also have our RelayCommand.cs class that we are using for our ICommand implementation to
            delegate calls into our ViewModels when Commands fire.
          </p>
          Fig05-000BA.png
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-000BA.png"/>
            <figcaption>Fig 05-000BA</figcaption>
          </figure>
          <p>
            Finally add or modify the connection string in the App.config file that points to our Zza Database.
          </p>
          <p>Firstly, we will define a set of Views and define the View switching or navigation that can happen to
            navigate throughout the application as an end user. To achieve this, we will create a series of feature
            folders.
          </p>
          <ul>
            <li>Customers</li>
            <li>Orders</li>
            <li>OrderPrep</li>
          </ul>
          <p>Now we will add a View and ViewModel to each one of those feature folders where the Views are UserControls
            and the ViewModels are classes:
          </p>
          <ul>
            <li>CustomerListView</li>
            <li>CustomerListViewModel</li>
            <li>OrderPrepView</li>
            <li>OrderPrepViewModel</li>
            <li>OrderView</li>
            <li>OrderViewModel</li>
          </ul>
          <p>Next we will add a TextBlock to each View to differentiate between them before adding any actual
            functionality:
          </p>
          <figure>
                <pre class="prettyprint"> &lt;Grid&gt;
    &lt;TextBlock Text=&quot;OrderPrep View&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-001</figcaption>
          </figure>
          <p>
            Now we need somewhere to host these Views. A good place for that (since this is a simple app) is in the
            MainWindow View. We need a ContainerControl that we can place our Views in and switch them in a navigation
            fashion. The perfect control for that is a ContentControl. What we will end up doing here is using its
            Content property and bind to a ViewModel reference. Similar to what we saw when we were covering data
            templates in the third module here we are going to expose a CurrentViewModel property from this View's
            ViewModel (which doesn't exist yet). By setting the CurrentViewModel property to an instance of a ViewModel
            and having a data template for it we can drive the rendering of the View and its ViewModel.
          </p>

          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ContentControl Content=&quot;{Binding CurrentViewModel}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-002</figcaption>
          </figure>
          <p>
            Now we need to add data templates that match up to our Views and ViewModels. To define the data templates
            for each View we will need to bring in their corresponding child namespaces:
          </p>
          <figure>
                <pre class="prettyprint">xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
xmlns:cust=&quot;clr-namespace:ZzaDesktop.Customers&quot;
xmlns:order=&quot;clr-namespace:ZzaDesktop.Orders&quot;
xmlns:prep=&quot;clr-namespace:ZzaDesktop.OrderPrep&quot;
xmlns:local=&quot;clr-namespace:ZzaDesktop&quot;
Title=&quot;MainWindow&quot;</pre>
            <figcaption>Fig 05-003</figcaption>
          </figure>
          <p>
            So we have a child namespace per sub folder and one for the root folder. Now we can define the DataTemplates
            in a ResourceDictionary for this window. We will setup one DataTemplate per ViewModel mapping to its
            ViewType:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;DataTemplate DataType=&quot;{x:Type cust:CustomerListViewModel}&quot;&gt;
        &lt;cust:CustomerListView /&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type order:OrderViewModel}&quot;&gt;
        &lt;order:OrderView /&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type prep:OrderPrepViewModel}&quot;&gt;
        &lt;prep:OrderPrepView /&gt;
    &lt;/DataTemplate&gt;
    &lt;DataTemplate DataType=&quot;{x:Type cust:AddEditCustomerViewModel}&quot;&gt;
        &lt;cust:AddEditCustomerView /&gt;
    &lt;/DataTemplate&gt;

&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 05-004</figcaption>
          </figure>
          <p>
            Note how each DataTemplate maps a DataType (the ViewModel Type) to a corresponding View and the use of this
            DataTemplate will create this View, set its DataContext to its ViewModel. So now anytime CurrentViewModel is
            set to instance of a CustomerListViewModel it will render out a CustomerListView with the ViewModel hooked
            up.
          </p>
          <p>
            So we just need a ViewModel that has a CurrentViewModel property and some logic and Commanding to switch the
            current reference of ViewModel inside that property.
          </p>
          <p>Create a class called MainWindowViewModel. In MainWindow view we can use static hook-up in the XAML:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window.DataContext&gt;
    &lt;local:MainWindowViewModel /&gt;
&lt;/Window.DataContext&gt;</pre>
            <figcaption>Fig 05-005</figcaption>
          </figure>

          <p>The above XAML just creates an instance of the ViewModel from XAML and use it to set the DataContext
            property of the Window.
          </p>
          <p>
            Now let's start fleshing out our MainWindowViewModel. The first property we know our ViewModel needs is a
            property called CurrentViewModel which we will set to a type of object for now:
          </p>
          <figure>
            <pre class="prettyprint">public object CurrentViewModel { get; set; }</pre>
            <figcaption>Fig 05-006</figcaption>
          </figure>
          <p>
            To drive the navigation, the MainWindowViewModel is going to act as a Parent in a hierarchy of ViewModels
            where the Child ViewModels will be managed by the parent ViewModel. We will declare an instance of each of
            the Child ViewModel types that we are going to be placing into that CurrentViewModel property:
          </p>
          <figure>
                <pre class="prettyprint">private CustomerListViewModel _customerListViewModel = new CustomerListViewModel();
private OrderViewModel _orderViewModel = new OrderViewModel();
private OrderPrepViewModel _orderPrepViewModel = new OrderPrepViewModel();</pre>
            <figcaption>Fig 05-007</figcaption>
          </figure>
          <p>
            We can see that just like the MainWindow ContentControl will act as a Container for the rendered Views our
            MainWindowViewModel can act as a Container or Parent to the contained ViewModels.
          </p>
          <p>
            The next thing to consider is that we will be setting the CurrentViewModel property over and over again as
            navigation occurs. Anytime that you are going to be setting a property that you are bound to after the
            initial XAML parsing has happened you would need to support INotifyPropertyChanged. We could just implement
            INPC directly on MainWindowViewModel and then later we would find we would need to do it on
            CustomerListViewModel, OrderViewModel and so on. The thing to recognise is that you pretty much always need
            INPC support on your ViewModels.
          </p>
          <p>
            We also need to make sure that whatever type you make the CurrentViewModel property we are able to put an
            instance of each of the child ViewModels into that property. Obviously using the object base class for all
            types of objects in .Net will work but it is better to be a bit more specific.
          </p>
          <p>
            So the combination of facts that each ViewModel will need to implement INPC and that we need some common
            base type for those ViewModels leads us to creating something that encapsulates the INPC pattern, and makes
            it so our ViewModels don’t have to be repetitive in declaring INPC and makes it so our property definitions
            can be a little bit more trim as well.
          </p>
          <p>In our next demo we will create a base class to encapsulate that INPC implementation then have our
            ViewModels inherit from it.
          </p>
          <h2>Demo: Encapsulating INotifyPropertyChanged</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-003" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-003"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-004" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-End\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-004"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            So we need to create a base class to encapsulate the implementation of INPC for our ViewModels. To do that
            we are going to add a new class to the project called BindableBase. The main idea behind BindableBase is to
            encapsulate the INotifyPropertyChanged implementation and provide helper methods to the derived class so
            they can easily trigger the appropriate notifications. Firstly, this class needs to implement INPC:
          </p>
          <figure>
                <pre class="prettyprint">namespace ZzaDesktop
{
    public class BindableBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged = delegate { };
}</pre>
            <figcaption>Fig 05-007A</figcaption>
          </figure>
          <p>and then it needs to expose a way for the derived classes to trigger that PropertyChanged event at the
            appropriate time as well as encapsulating the check to make sure that the value of any property that is
            being set is actually changing.
          </p>
          <p>
            To do that we will define two methods on this class. One called SetProperty and one called
            OnPropertyChanged:
          </p>
          <figure>
                <pre class="prettyprint">protected virtual void SetProperty&lt;T&gt;(ref T member, T val, [CallerMemberName] string propertyName = null)
{
    if (object.Equals(member, val)) return;

    member = val;
    PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
}

protected virtual void OnPropertyChanged(string propertyName)
{
    PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
}</pre>
            <figcaption>Fig 05-007B</figcaption>
          </figure>
          <p>The SetProperty method is intended to be set from the set block of each property and encapsulates the check
            to see if the value actually changed and if so it sets the member variable and triggers the PropertyChanged
            event.
          </p>
          <p>
            The other method, OnPropertyChanged, is meant for places where maybe changing one property means you need to
            trigger an update on two properties such as a computed property. So for that one you can just pass in the
            property name and the event will be fired, since it's encapsulated down here at the base level. Now let's go
            see what it can do for us with our ViewModels
          </p>
          <p>
            So back in our MainWindowViewModel we can change the way we define our properties, we can’t do just auto
            implemented properties because we need to have a set block to trigger the change but we want that to be as
            compact as possible.
          </p>
          <p>
            We can use BindableBase as our property type and the property name is still CurrentViewModel. Make sure you
            set MainWindowViewModel to inherit from BindableBase:
          </p>
          <figure>
                <pre class="prettyprint">class MainWindowViewModel : BindableBase
{
    private CustomerListViewModel _customerListViewModel = new CustomerListViewModel();
    private OrderViewModel _orderViewModel = new OrderViewModel();
    private OrderPrepViewModel _orderPrepViewModel = new OrderPrepViewModel();

    private BindableBase _CurrentViewModel;

    public BindableBase CurrentViewModel
    {
        get { return _CurrentViewModel; }
        set { SetProperty(ref _CurrentViewModel, value); }
}</pre>
            <figcaption>Fig 05-008</figcaption>
          </figure>
          <p>
            The standard use of SetProperty is that you pass in the backing variable by ref into the SetProperty method
            on the base class. You will also pass in the value that is currently being set for that property.
          </p>
          <p>
            In the BindableBase implementation of SetProperty you can see how those members are coming in:
          </p>
          <figure>
                <pre class="prettyprint">public class BindableBase : INotifyPropertyChanged
{
    protected virtual void SetProperty&lt;T&gt;(ref T member, T val,
                [CallerMemberName] string propertyName = null)</pre>
            <figcaption>Fig 05-008A</figcaption>
          </figure>
          <p>The by ref member variable comes in in the first argument, the value comes in second and the third one gets
            set with a nice feature of C# which is the CallerMemberName attribute:
          </p>
          <figure>
            <pre class="prettyprint">[CallerMemberName] string propertyName = null</pre>
            <figcaption>Fig 05-008B</figcaption>
          </figure>
          <p>That attribute makes it so it can automatically pick off the name of the thing that called in here – which
            in our case, since the SetProperty it being called from the property is the property name itself –
            CurrentViewModel.
          </p>
          <figure>
                <pre class="prettyprint">class MainWindowViewModel : BindableBase
{
    private CustomerListViewModel _customerListViewModel = new CustomerListViewModel();
    private OrderViewModel _orderViewModel = new OrderViewModel();
    private OrderPrepViewModel _orderPrepViewModel = new OrderPrepViewModel();

    private BindableBase _CurrentViewModel;

    public BindableBase CurrentViewModel
    {
        get { return _CurrentViewModel; }
        set { SetProperty(ref _CurrentViewModel, value); }
    }</pre>
            <figcaption>Fig 05-009</figcaption>
          </figure>
          <p>
            You can see it allows you to have a nice compact property definition with the get and set blocks but still
            do all the things that you need to do for INPC like checking the value actually changed and firing the
            event. As a nice consequence it allows us to set the type of this property to be BindableBase assuming that
            each of our ViewModels will inherit from that. So now let’s add BindableBase to each of our ViewModels.
          </p>
          <figure>
                <pre class="prettyprint">namespace ZzaDesktop.Customers
{
    class CustomerListViewModel : BindableBase
    {</pre>
            <figcaption>Fig 05-009A</figcaption>
          </figure>
          <figure>
                <pre class="prettyprint">namespace ZzaDesktop.Orders
{
    class OrderViewModel : BindableBase
    {</pre>
            <figcaption>Fig 05-009B</figcaption>
          </figure>
          <figure>
                <pre class="prettyprint">namespace ZzaDesktop.OrderPrep
{
    class OrderPrepViewModel : BindableBase
    {
    }
}</pre>
            <figcaption>Fig 05-009C</figcaption>
          </figure>
          <p>So next we'll hook up the Commanding to actually drive this switching and navigation.</p>
          <h2>Demo: View Switching Navigation</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-005" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-005"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-006" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-006"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            So in this demo we will start doing some actual View switching using our CurrentViewModel property. We just
            need some way to drive the setting of this property and we are going to make it so the end user can command
            going to the CustomerList or to the OrderPreparation View. To get to the OrderView we are going to need to
            know what Customer that order is being placed for so that one is going to be driven in a slightly different
            way.
          </p>
          <p>
            So we need to setup some top level navigation to the CustomerListViewModel and the OrderPrepViewModel and
            the logic for that switching should belong inside of this ViewModel. We will declare a method called OnNav
            that takes a string destination and then we will setup a simple switch case to set the CurrentViewModel
            property to the appropriate child ViewModel when a certain identifier comes in:
          </p>
          <figure>
                <pre class="prettyprint">private void OnNav(string destination)
{
    switch (destination)
    {
        case &quot;orderPrep&quot;:
            CurrentViewModel = _orderPrepViewModel;
            break;
        case &quot;customers&quot;:
        default:
            CurrentViewModel = _customerListViewModel;
            break;
    }
}</pre>
            <figcaption>Fig 05-010</figcaption>
          </figure>
          <p>
            We need some way to call that when the user interacts with the View. We know from previous modules a good
            way to set that up is with Commands. So let’s declare a Command that we can invoke the method with:
          </p>
          <figure>
            <pre
              class="prettyprint">public RelayCommand&lt;string&gt; NavCommand { get; private set; }</pre>
            <figcaption>Fig 05-011</figcaption>
          </figure>
          <p>
            Now we just need to construct that so we will add a Constructor to the class and set that Command pointing
            to the OnNav method:
          </p>
          <figure>
                <pre class="prettyprint"> public MainWindowViewModel()
{
    NavCommand = new RelayCommand&lt;string&gt;(OnNav);
}</pre>
            <figcaption>Fig 05-012</figcaption>
          </figure>
          <p>
            Now we just need to be able to trigger that Command from our View so keeping it simple we will use some
            Buttons. Add two rows to the Grid in the MainWindow.xaml View:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
&lt;Grid.RowDefinitions&gt;
    &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
    &lt;RowDefinition Height=&quot;*&quot; /&gt;
&lt;/Grid.RowDefinitions&gt;
&lt;Grid x:Name=&quot;NavBar&quot;&gt;
    &lt;Grid.ColumnDefinitions&gt;
        &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
        &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
        &lt;ColumnDefinition Width=&quot;*&quot; /&gt;
    &lt;/Grid.ColumnDefinitions&gt;
    &lt;Button Content=&quot;Customers&quot;
            Command=&quot;{Binding NavCommand}&quot;
            CommandParameter=&quot;customers&quot;
            Grid.Column=&quot;0&quot; /&gt;
    &lt;Button Content=&quot;OrderPrep&quot;
            Command=&quot;{Binding NavCommand}&quot;
            CommandParameter=&quot;orderPrep&quot;
            Grid.Column=&quot;2&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-013</figcaption>
          </figure>
          <p>
            We add some Buttons to the top row, in the second row of the Grid we have our ContentControl as before. The
            Button on the left is used for navigating to Customers whilst the Button on the right is used for navigating
            to Orders. You can see we are just pointing those at the NavCommand property exposed by our ViewModel and
            using the CommandParameter to pass in the string to drive which navigation should take place. With all that
            in place we should be able to go ahead and run the application. We can see the two Buttons and clicking on
            them takes you to the relevant View:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-014.png"/>
            <figcaption>Fig 05-014</figcaption>
          </figure>
          <p>
            So we are getting top level navigation driven by the User, triggering Commands into the ViewModel, and the
            ViewModel encapsulates the navigation logic. We are leveraging implicit DataTemplates to marry up the Views
            and ViewModels simply by setting a child ViewModel property.
          </p>
          <p>Now to start making this more real we're going to flesh out the CustomerListView cause the only way we can
            get to the Order view is if we know what Customer to create an Order for.
          </p>
          <h2>Demo: Data Loading into a ViewModel</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-007" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-007"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-008" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-End\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-008"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>Now that we have our basic top-level navigation working it is time to start fleshing out the
            CustomerListView. Replace the TextBox with a DataGrid:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;DataGrid ItemsSource=&quot;{Binding Customers}&quot;
              AutoGenerateColumns=&quot;False&quot;
              CanUserAddRows=&quot;False&quot;
              Grid.Row=&quot;1&quot;&gt;
        &lt;DataGrid.Columns&gt;
            &lt;DataGridTextColumn Binding=&quot;{Binding FullName}&quot;
                                Width=&quot;*&quot; /&gt;
            &lt;DataGridTemplateColumn Width=&quot;Auto&quot;&gt;
                &lt;DataGridTemplateColumn.CellTemplate&gt;
                    &lt;DataTemplate&gt;
                        &lt;Button Content=&quot;Place Order&quot;
                                Command=&quot;{Binding DataContext.PlaceOrderCommand, RelativeSource={RelativeSource AncestorType={x:Type DataGrid}}}&quot;
                                CommandParameter=&quot;{Binding}&quot;
                                Margin=&quot;5&quot; /&gt;
                    &lt;/DataTemplate&gt;
                &lt;/DataGridTemplateColumn.CellTemplate&gt;
            &lt;/DataGridTemplateColumn&gt;
        &lt;/DataGrid.Columns&gt;
    &lt;/DataGrid&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-015</figcaption>
          </figure>
          <p>
            We have added a DataGrid that is binding to Customers which means our ViewModel must now expose a Customers
            Collection. We have got a set of two columns defined. The first one is bound to the FullName property of the
            Customer and will take up most of the row. The second one is a templated column that contains a Button to
            place an order for a given Customer. That Button is going to pass the Customer by grabbing just the current
            DataContext for the cell.
          </p>
          <p>
            The Command itself will exist on our ViewModel. So to get to our ViewModel from inside of the row where the
            DataContext is not the ViewModel we have to break out of the local DataContext using a RelativeSource
            binding:
          </p>
          <figure>
                <pre class="prettyprint"> &lt;Button Content=&quot;Place Order&quot;
    Command=&quot;{Binding DataContext.PlaceOrderCommand, RelativeSource={RelativeSource AncestorType={x:Type DataGrid}}}&quot;
    CommandParameter=&quot;{Binding}&quot;
    Margin=&quot;5&quot; /&gt;</pre>
            <figcaption>Fig 05-015A</figcaption>
          </figure>
          <p>
            that let’s us walk up the Visual Tree until we get to the DataGrid at which point we are in the part of the
            XAML where our ViewModel is the current DataContext. Then we can set the path to the DataContext of the
            DataGrid then dot down into PlaceOrderCommand which we will add to our ViewModel.
          </p>
          <p>In the CustomerListViewModel we will start by adding the Customers Collection and the PlaceOrderCommand:
          </p>
          <figure>
                <pre class="prettyprint">private ObservableCollection&lt;Customer&gt; _customers;
public ObservableCollection&lt;Customer&gt; Customers
{
    get { return _customers; }
    set { SetProperty(ref _customers, value); }
}</pre>
            <figcaption>Fig 05-016</figcaption>
          </figure>
          <p>
            Now we need to be able to load Customers into that Customers collection. For that we will need the
            repository. The ViewModel can new up an instance of the repository as an initial crude attempt. In the next
            module we will cover dependency injection and how we can use that to pass the repository in. For now, let’s
            just hard code it in here:
          </p>
          <figure>
            <pre class="prettyprint">private ICustomersRepository _repo = new CustomersRepository();</pre>
            <figcaption>Fig 05-017</figcaption>
          </figure>
          <p>
            So we new up an instance of the Customers repository and hold it in a member variable of the interface type.
            Now we need to trigger where we are going to load the Customers into the collection and because that is
            going to be an asynchronous load using the Loaded event of the View is actually a good way to go. We just
            have to wire it up with the behavior as we saw in the previous module. First let’s define the target method
            that we want to invoke when the Loaded event fires:
          </p>
          <figure>
                <pre class="prettyprint">public async void LoadCustomers()
{
    Customers = new ObservableCollection&lt;Customer&gt;(
        await _repo.GetCustomersAsync());
}</pre>
            <figcaption>Fig 05-018</figcaption>
          </figure>
          <p>
            Here we can see that we are going to go out to our CustomerRepository and call GetCustomersAsync, await on
            the async method. When it returns the value we are going to pass it into the constructor of
            ObservableCollection and populate our Customers property. Now we just need to call that when the event
            fires.
          </p>
          <p>
            The quickest way to get that hooked up is in Blend. Make sure the UserControl root element is selected in
            Objects and Timeline:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-018A.png"/>
            <figcaption>Fig 05-018A</figcaption>
          </figure>
          <p>
            go up to the Assets tab, Behaviors and then double click CallMethodAction:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-018B.png"/>
            <figcaption>Fig 05-018B</figcaption>
          </figure>
          <p>
            That adds it as a child of the root element.
          </p>
          <p>
            If you open the CustomerListView back in Visual Studio you will see that Blend has added two namespaces of
            the Blend SDK, it added the Triggers collection to the Root element, and it added an EventTrigger which we
            want to change to the Loaded event and a CallMethodAction underneath that. We want to set the TargetObject
            to just Binding to get to a reference of our ViewModel and the MethodName to LoadCustomers:
          </p>
          <figure>
                <pre class="prettyprint">&lt;i:Interaction.Triggers&gt;
    &lt;i:EventTrigger EventName=&quot;Loaded&quot;&gt;
        &lt;ei:CallMethodAction TargetObject=&quot;{Binding}&quot; MethodName=&quot;LoadCustomers&quot;/&gt;
    &lt;/i:EventTrigger&gt;
&lt;/i:Interaction.Triggers&gt;</pre>
            <figcaption>Fig 05-019</figcaption>
          </figure>
          <p>With that we should be able to run, click on the Customers Button and the Customers should be loaded
            asynchronously:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-020.png"/>
            <figcaption>Fig 05-020</figcaption>
          </figure>
          <p>
            Now we just have to get the Place Order Button wired up with a Command in the ViewModel. In the ViewModel
            define a Command property called PlaceOrderCommand:
          </p>
          <figure>
            <pre
              class="prettyprint">public RelayCommand&lt;Customer&gt; PlaceOrderCommand { get; private set; }</pre>
            <figcaption>Fig 05-021</figcaption>
          </figure>
          <p>In the constructor for the ViewModel initialize the Command property and point it to a handling method:
          </p>
          <figure>
                <pre class="prettyprint"> public CustomerListViewModel()
{
    PlaceOrderCommand = new RelayCommand&lt;Customer&gt;(OnPlaceOrder);
}</pre>
            <figcaption>Fig 05-022</figcaption>
          </figure>
          <p>Now add the handling method:</p>
          <figure>
                <pre class="prettyprint">private void OnPlaceOrder(Customer customer)
{
    PlaceOrderRequested(customer.Id);
}</pre>
            <figcaption>Fig 05-023</figcaption>
          </figure>
          <p>Just to make sure that is all setup correctly we can set a break point on the OnPlaceOrder method and run,
            go to our Customers View, click on Place Order and you can see we're calling our command handler with the
            Customer reference.
          </p>
          <p>Next up we need to tackle navigating to an OrderView with that Customers context.</p>
          <h2>Demo: Navigation with Parameters</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-009" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-009"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-010" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-010"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            At this point we are all wired up to do top level navigation between the CustomersList and the OrderPrep
            area of the application. Now we wired ourselves up to present a list of Customers and have a PlaceOrder
            Command that we can then invoke on each Customer passing that into the CustomerListViewModel.
          </p>
          <p>
            Now we need to cause navigation from the Child ViewModel but that navigation is going to replace this
            ViewModels View as the Current View in the top level navigation container. That means this child ViewModel
            needs to be able to communicate up to its parent ViewModel:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-023A.png"/>
            <figcaption>Fig 05-023A</figcaption>
          </figure>
          <p>
            which is the MainWindowViewModel because that is where the navigation is being managed.
          </p>
          <p>
            There is a number of ways you can go about doing this but one simple and straightforward way is to allow
            Child ViewModels to raise events that their Parent ViewModel can handle. Much like a human child tries to
            get its parent to do something with events – sometimes polite and controlled, sometimes disastrous (we'll
            avoid those here in our code).
          </p>
          <p>
            Basically we need to raise an event to our parent. To do that we can simply declare an event that is raised
            by this ViewModel. So we will have an event that can pass a GUID (the CustomerId) that we want to start
            placing an Order for:
          </p>
          <figure>
            <pre
              class="prettyprint">public event Action&lt;Guid&gt; PlaceOrderRequested = delegate { };</pre>
            <figcaption>Fig 05-023B</figcaption>
          </figure>
          <p>
            Once we have the event defined we can raise it from inside of our PlaceOrder command handler passing the
            Customer Id of the Customer the Command was raised for:
          </p>
          <figure>
                <pre class="prettyprint">private void OnPlaceOrder(Customer customer)
{
    PlaceOrderRequested(customer.Id);
}</pre>
            <figcaption>Fig 05-024</figcaption>
          </figure>
          <p>
            In the MainWindowViewModel (the parent ViewModel) in the constructor , since our ViewModel is constructed up
            above with an initializer, we can just subscribe to the PlaceOrderRequested event and have some handling
            method that we will place here in the parent:
          </p>
          <figure>
                <pre class="prettyprint"> public MainWindowViewModel()
        {
            NavCommand = new RelayCommand&lt;string&gt;(OnNav);
            _customerListViewModel.PlaceOrderRequested += NavToOrder;
        }</pre>
            <figcaption>Fig 05-025</figcaption>
          </figure>
          <p>To implement the method, we will drop down to the bottom of the class and declare a method with the
            appropriate signature:
          </p>
          <figure>
            <pre class="prettyprint">private void NavToOrder(Guid customerId)</pre>
            <figcaption>Fig 05-026</figcaption>
          </figure>
          <p>
            Now before we go and set the CurrentViewModel to cause the navigation to occur to the OrderViewModel we need
            to pass some context. What we can do is pan on exposing a property on the ViewModel that the parent can set
            as the context that drives the way it is going to behave when it is presented. We take the Guid that was
            passed to us and just push it down to the child ViewModel:
          </p>
          <figure>
                <pre class="prettyprint">private void NavToOrder(Guid customerId)
        {
            _orderViewModel.CustomerId = customerId;
            CurrentViewModel = _orderViewModel;
        }</pre>
            <figcaption>Fig 05-027</figcaption>
          </figure>
          <p>In the OrderViewModel add an appropriate property:</p>
          <figure>
                <pre class="prettyprint">private Guid _CustomerId;

public Guid CustomerId
{
    get { return _CustomerId; }
    set { SetProperty(ref _CustomerId, value); }
}</pre>
            <figcaption>Fig 05-028</figcaption>
          </figure>

          <p>In the OrderView add the following XAML:</p>
          <figure>
                <pre class="prettyprint">&lt;StackPanel Orientation=&quot;Horizontal&quot;&gt;
    &lt;TextBlock Text=&quot;Placing Order for Customer: &quot; /&gt;
    &lt;TextBlock Text=&quot;{Binding CustomerId}&quot; /&gt;
&lt;/StackPanel&gt;</pre>
            <figcaption>Fig 05-029</figcaption>
          </figure>
          <p>
            We have added a Horizontal StackPanel with two TextBlocks to present that we are placing an order for a
            given Customer Id. With that in place we can go ahead and run the application, go to Customers, select a
            Customer, click Place Order and you will be taken to the Order page showing the Customer Id:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-030.png"/>
            <figcaption>Fig 05-030</figcaption>
          </figure>
          <p>Now we're not going to fully flesh out this View with taking orders, order items and all that kind of
            stuff, we're going to focus on rounding out the functionality for Customers.
          </p>
          <h2>Demo: Add/Edit Navigation</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-011" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-011"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex05-012" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 5\ZzaDesktop-Start\ZzaDesktop.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex05-012"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            So to finish up the navigation topics in this module we just need to add a new View and ViewModel to handle
            adding and editing. Since the two will combine the same data entry fields we can combine them into a single
            View and ViewModel that has a mode to it that switches between Add mode and Edit mode.
          </p>
          <p>
            The first step is to define a new AddEditCustomerView and AddEditCustomerViewModel. Now we just need to put
            in place some way to navigate to this View in Add mode or Edit mode. That will involve putting some Command
            buttons onto our CustomerListView:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;Grid.RowDefinitions&gt;
        &lt;RowDefinition Height=&quot;Auto&quot; /&gt;
        &lt;RowDefinition Height=&quot;*&quot; /&gt;
    &lt;/Grid.RowDefinitions&gt;
    &lt;Grid&gt;
        &lt;Button Content=&quot;Add Customer&quot;
                Command=&quot;{Binding AddCustomerCommand}&quot;
                HorizontalAlignment=&quot;Left&quot; /&gt;
    &lt;/Grid&gt;
    &lt;DataGrid ItemsSource=&quot;{Binding Customers}&quot;
              AutoGenerateColumns=&quot;False&quot;
              CanUserAddRows=&quot;False&quot;
              Grid.Row=&quot;1&quot;&gt;</pre>
            <figcaption>Fig 05-031</figcaption>
          </figure>
          <p>
            Our root Grid now has two rows, the top one will Autosize based on its content. We have added some content
            to that first row that is a Button that invokes an AddCustomerCommand in our ViewModel. For our Edit we want
            to use the context of a given row within the Grid that is a single Customer. We will just add another
            templated column similar to the PlaceOrderCommand:
          </p>
          <figure>
                <pre class="prettyprint">&lt;DataGridTemplateColumn Width=&quot;Auto&quot;&gt;
    &lt;DataGridTemplateColumn.CellTemplate&gt;
        &lt;DataTemplate&gt;
            &lt;Button Content=&quot;Place Order&quot;
                    Command=&quot;{Binding DataContext.PlaceOrderCommand, RelativeSource={RelativeSource AncestorType={x:Type DataGrid}}}&quot;
                    CommandParameter=&quot;{Binding}&quot;
                    Margin=&quot;5&quot; /&gt;
        &lt;/DataTemplate&gt;
    &lt;/DataGridTemplateColumn.CellTemplate&gt;
&lt;/DataGridTemplateColumn&gt;</pre>
            <figcaption>Fig 05-032</figcaption>
          </figure>
          <p>
            We use a RelativeSource Binding to get up to the DataGrid, uses the DataContext property of the DataGrid to
            get to the ViewModel, then dots down to the EditCustomerCommand that we will be adding shortly.
          </p>
          <p>
            Let’s add the EditCustomerCommand and AddCustomerCommand to the CustomerListViewModel. The pattern should be
            getting familiar now. First we define the property on our ViewModel that exposes that Command:
          </p>
          <figure>
                <pre class="prettyprint">public RelayCommand AddCustomerCommand { get; private set; }
public RelayCommand&lt;Customer&gt; EditCustomerCommand { get; private set; }</pre>
            <figcaption>Fig 05-033</figcaption>
          </figure>
          <p>
            The AddCustomerCommand takes no arguments, the EditCustomerCommand takes the Customer object for the row the
            Button was clicked in. Next we go to the constructor for our ViewModel and construct the command object,
            pointing it to a handling method:
          </p>
          <figure>
                <pre class="prettyprint">public CustomerListViewModel()
{
    PlaceOrderCommand = new RelayCommand&lt;Customer&gt;(OnPlaceOrder);
    AddCustomerCommand = new RelayCommand(OnAddCustomer);
    EditCustomerCommand = new RelayCommand&lt;Customer&gt;(OnEditCustomer);

}</pre>
            <figcaption>Fig 05-034</figcaption>
          </figure>
          <p>Now stub out the handling methods:</p>
          <figure>
                <pre class="prettyprint">private void OnAddCustomer()
{
    AddCustomerRequested(new Customer { Id = Guid.NewGuid() });
}
private void OnEditCustomer(Customer cust)
{
    EditCustomerRequested(cust);
}</pre>
            <figcaption>Fig 05-035</figcaption>
          </figure>
          <p>
            Now, just like PlaceOrder, we need to cause navigation to occur from down inside the child ViewModel so the
            pattern we established is to raise an event to our Parent ViewModel. We will need two more events for that:
          </p>
          <figure>
                <pre class="prettyprint">public event Action&lt;Customer&gt; AddCustomerRequested = delegate { };
public event Action&lt;Customer&gt; EditCustomerRequested = delegate { };</pre>
            <figcaption>Fig 05-036</figcaption>
          </figure>
          <p>Each event will pass a Customer and now we just need to fire those from the Command handlers:</p>
          <p>
            For AddCustomer we will just fire the event and pass in a new Customer object setting its Id to a new Guid.
            For EditCustomer we will just fire the event passing in the Customer that was passed to us through the
            Command:
          </p>
          <figure>
                <pre class="prettyprint">private void OnAddCustomer()
{
    AddCustomerRequested(new Customer { Id = Guid.NewGuid() });
}
private void OnEditCustomer(Customer cust)
{
    EditCustomerRequested(cust);
}</pre>
            <figcaption>Fig 05-037</figcaption>
          </figure>
          <p>
            So now we just need to go up to the Parent ViewModel level and do the event handling and navigation. So
            first we will need an instance of the new child ViewModel that we are going to navigate to:
          </p>

          <figure>
            <pre class="prettyprint">private AddEditCustomerViewModel _addEditViewModel = new AddEditCustomerViewModel();</pre>
            <figcaption>Fig 05-038</figcaption>
          </figure>
          <p>We can then subscribe to its events in the constructor of the ViewModel (as we did for PlaceOrder):
          </p>
          <figure>
                <pre class="prettyprint">_customerListViewModel.AddCustomerRequested += NavToAddCustomer;
_customerListViewModel.EditCustomerRequested += NavToEditCustomer;</pre>
            <figcaption>Fig 05-039</figcaption>
          </figure>
          <p>Now we just need to implement the handling methods:</p>
          <figure>
                <pre class="prettyprint">private void NavToAddCustomer(Customer cust)
{
    _addEditViewModel.EditMode = false;
    _addEditViewModel.SetCustomer(cust);
    CurrentViewModel = _addEditViewModel;
}

private void NavToEditCustomer(Customer cust)
{
    _addEditViewModel.EditMode = true;
    _addEditViewModel.SetCustomer(cust);
    CurrentViewModel = _addEditViewModel;
}</pre>
            <figcaption>Fig 05-040</figcaption>
          </figure>
          <p>
            Each takes in a Customer. What we expect to do here is set a flag on the AddEditViewModel to tell it whether
            it is in EditMode or not and then we need some way to pass that Customer context down into the ViewModel. We
            are doing that with an imperative call to a method. Finally, we set the CurrentViewModel property so that it
            becomes the current View in the root container.
          </p>
          <p>
            Now for all of that to work we need to implement the property, the method, and make it so that
            AddEditViewModel is a BindableBase object because that is the type of CurrentViewModel.
          </p>
          <p>So in AddEditCustomerViewModel add the following code:</p>
          <figure>
                <pre class="prettyprint">class AddEditCustomerViewModel : BindableBase
{
    private bool _EditMode;

    public bool EditMode
    {
        get { return _EditMode; }
        set { SetProperty(ref _EditMode, value); }
    }

    private Customer _editingCustomer = null;

    public void SetCustomer(Customer cust)
    {
        _editingCustomer = cust;
    }
}</pre>
            <figcaption>Fig 05-041</figcaption>
          </figure>
          <p>
            Firstly, we add the BindableBase base class, define our EditMode as a boolean property, define a SetCustomer
            method that takes in a Customer and hold onto that Customer for the span of the editing context:
          </p>
          <p>
            Now if we were going to just bind to this Customer directly and let the editing happen directly against it
            we could have just set a property. As we will see in the next module you may not always want to directly
            edit your Model objects you may need to wrap them in some scenarios. In that case we can pass this Customer
            down in here and produce a wrapped object. We will cover this in the next module.
          </p>
          <p>For now, we need to put something in the View so we can identify when it is on screen:</p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;TextBlock Text=&quot;Add / Edit Customer View&quot; /&gt;

&lt;/Grid&gt;</pre>
            <figcaption>Fig 05-042</figcaption>
          </figure>
          <p>We then want to go to the MainWindow View and add another DataTemplate:</p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate DataType=&quot;{x:Type cust:AddEditCustomerViewModel}&quot;&gt;
    &lt;cust:AddEditCustomerView /&gt;
&lt;/DataTemplate&gt;</pre>
            <figcaption>Fig 05-043</figcaption>
          </figure>
          <p>
            This maps the AddEditCustomerViewModel to the AddEditCustomerView so it can be rendered out.
          </p>
          <p>
            With all that in place we can run the application, go to Customers, click on the Edit Button for a selected
            Customer and see that we end up in the Add/Edit Customer View:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig05-044.png"/>
            <figcaption>Fig 05-044</figcaption>
          </figure>
          <p>And likewise when clicking the Add customer button we end up in the same place.</p>
          <p>
            Now this might seem like a lot of ceremony: having to define a Command that gets despatched down into this
            ViewModel, the ViewModel raises an event to the Parent ViewModel, the Parent ViewModel handles that event
            and causes the navigation. The point of all of this is to keep each of these parts loosely coupled from the
            other ones. We have all the navigation logic centralized in the MainWindowViewModel, it just handles its
            part of the interaction which is to manage the Customer List and events surrounding it.
          </p>
          <p>Now there are certainly other ways to go about this:</p>
          <ul>
            <li>You could have a client service that manages navigation for a given container or set of containers.
            </li>
            <li>If you use a framework like Prism you could do something like region navigation</li>
          </ul>
          <p>However, this approach is simple and straightforward and it only takes moments to stub each navigation out.
          </p>
          <p>
            In the next module we will finish fleshing out the AddEditCustomerView and in the process of doing so we
            will touch on a number of other concepts including:
          </p>
          <ul>
            <li>Wrapping model objects</li>
            <li>Using the Visual Studio Designer to scaffold out data entry views</li>
            <li>Doing validation on your editable objects</li>
            <li>Doing dependency injection for your ViewModels</li>
          </ul>
          <h2>Summary</h2>
          <p>In this module we saw a number of things and got started building out our application. We saw:</p>
          <ul>
            <li>Naming and location of components is important for maintainability and you want to put some thought into
              where you want to put things and how you name them so that you don't have to go hunting around and trying
              to find a View/ViewModel or Model object that's poorly named for what it's purpose is.
            </li>
            <li>We saw how hierarchical MVVM works and how it can mirror the way you can compose a complex screen of
              multiple child views and have the ViewModels mirror that structure and allow parent ViewModels control
              child ViewModels and coordinate between them.
            </li>
            <li>And then you started to see through the demos that building out an MVVM app is a progressive sequence of
              defining Views, ViewModels, navigation and communications to satisfy the requirement at a granular level
              for each component.
            </li>
          </ul>
          <p>In the next module we'll continue building out those use cases and we'll look at things like leveraging the
            designer in Visual Studio, validating input from the user and using dependency injection to tie together
            ViewModels with their client services. So hang in there for one more module and you'll be an MVVM ninja
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WPFMVVMInDepth05AppliedMVVMPart1HierarchiesAndNavigation'
}
</script>

<style scoped>

</style>
