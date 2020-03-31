<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Hooking up Views and ViewModels in MVVM</h2>
        </div>
        <div class="panel-body">
          <h2>Overview</h2>
          <p>
            In this module we will cover different ways that Views can be hooked up to their ViewModels. We will also
            cover how databinding is used to expose data from your Data Models to your Views.
          </p>
          <p>
            We will start with View-First Construction Patterns where the View is constructed first and then takes care
            of constructing and hooking up its own ViewModel.
          </p>
          <p>Next we will cover Data Binding to make it clear how MVVM relies on data binding and uses it to flow data
            between the View and the ViewModel.
          </p>
          <p>
            Finally, we will cover ViewModel-First approach where Data Templates are used to create the View based on an
            instance of a ViewModel being placed into a data binding context.
          </p>
          <h2>View-First Construction</h2>
          <p>
            View-First Construction can be performed declaratively in the XAML. XAML parsing kicks in just as your View
            is being constructed initiated by the call to InitializeComponent() that is in your Views Constructor:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl x:Class=&quot;ZzaDashboard.Customers.CustomerEditView&quot;
         Width=&quot;400&quot;
         Loaded=&quot;OnLoaded&quot;
         ...&gt;
    &lt;UserControl.DataContext&gt;
        &lt;local:CustomerEditViewModel /&gt;
    &lt;/UserControl.DataContext&gt;
&lt;/UserControl&gt;</pre>
            <figcaption>Fig 03-001A</figcaption>
          </figure>

          <p>
            whether the View is a Window, User Control or a Page. The parser generally works top to bottom and left to
            right as it works its way through your XAML. It calls the default constructor for each element as it
            encounters it and then sets any properties for the constructed object based on the attributes of that
            element.
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001AB.png"/>
            <figcaption>Fig 03-001AB</figcaption>
          </figure>
          <p>
            It also wires up event handlers based on the attributes as well.
          </p>
          <p>
            Properties can also be set using nested elements for when the value of the property is an object that needs
            to be constructed as well:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001AC.png"/>
            <figcaption>Fig 03-001AC</figcaption>
          </figure>
          <p>
            As a result of this process, simply adding your ViewModel as a nested element in the setter for the
            DataContext property allows you to satisfy the basic equation of MVVM.
          </p>
          <p>
            Another way you can do View-First construction is by simply constructing the ViewModel yourself in the code
            behind of your View and setting the DataContext there with the instance:
          </p>
          <figure>
                <pre class="prettyprint">public partial class CustomerListView : UserControl
{
    public CustomerListView()
    {
        this.DataContext = new CustomerListViewModel();
        InitializeComponent();
    }
}</pre>
            <figcaption>Fig 03-001B</figcaption>
          </figure>
          <p>Typically, this is performed in the constructor method for your View but you could also defer the
            construction until the Loaded event of the View fires.
          </p>
          <p>
            One reason for constructing the ViewModel in the code-behind instead of the XAML is that the ViewModel
            constructor takes parameters. XAML parsing can only construct elements if they have a default constructor so
            if the ViewModel needs to have something passed into it that is accessible from the code behind of the View
            that might be another reason for doing the construction in the code behind.
          </p>
          <p>Another reason would be if you were using something like a dependency injection container to do the
            construction of the ViewModel. So that it can inject any dependencies the ViewModel has.
          </p>
          <p>Let's start putting together a sample that demonstrates View-First construction and that we can build on
            for the rest of the demos for this module and the next.
          </p>

          <h2>Demo: View-First MVVM Hook-up</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-001" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-XAMLHookup-Start\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-001"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-002" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-XAMLHookup-End\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-002"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>
            In this demo we will create a View and a ViewModel and hook them up statically through the XAML.
          </p>
          <p>
            The starting point for this demo is that we have a data layer (Zza.Data) covered previously. It's a separate
            class library project with a Entity Framework DbContext and some Model objects associated with that for a
            Pizza ordering domain:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BA.png"/>
            <figcaption>Fig 03-001BA</figcaption>
          </figure>
          <p>
            We've also got the repository layer that I also covered previously and we'll be consuming our data through
            that.
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BB.png"/>
            <figcaption>Fig 03-001BB</figcaption>
          </figure>
          <p>
            We will put the View and the ViewModel in a Customers feature folder:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BC.png"/>
            <figcaption>Fig 03-001BC</figcaption>
          </figure>
          <p>
            The View is just a UserControl called CustomerListView (most of your Views will be UserControls) and the
            ViewModel is just a class called CustomerListViewModel:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BD.png"/>
            <figcaption>Fig 03-001BD</figcaption>
          </figure>
          <p>
            And it follows the naming conventions that the View has View at the end of it's type name and the ViewModel
            has ViewModel at the end of it's typename so there easy to correlate.
          </p>
          <p>Now before we dig into the MVVM let's go ahead and build this and I'll place an instance of my View in the
            MainWindow so we'll go to the designer, toolbox drag and drop CustomerListView:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BE.png"/>
            <figcaption>Fig 03-001BE</figcaption>
          </figure>
          <p>
            then right-click and select reset all from the Layout menu to remove the padding and margins etc:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-001BF.png"/>
            <figcaption>Fig 03-001BF</figcaption>
          </figure>
          <figure>
                <pre class="prettyprint">&lt;Window xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
        xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
        xmlns:Customers=&quot;clr-namespace:MVVMHookupDemo.Customers&quot;
        x:Class=&quot;MVVMHookupDemo.MainWindow&quot;
        Title=&quot;MainWindow&quot;
        Height=&quot;350&quot;
        Width=&quot;525&quot;&gt;
    &lt;Grid&gt;
        &lt;Customers:CustomerListView/&gt;
    &lt;/Grid&gt;
&lt;/Window&gt;</pre>
            <figcaption>Fig 03-001BG</figcaption>
          </figure>

          <p>
            And it takes a way all the margin, sizing and so on so it fills the Grid cell. That's just a fancy way
            through drag and drop of creating an instance of the UserControl in the View and adding the appropriate
            namespace.
          </p>
          <p>
            Now let's focus on the ViewModel since that's the heart of MVVM. First, make the ViewModel class public and
            add a property (using the prop Visual Studio code snippet). Make the type of the property an
            ObservableCollection of type Customer (don’t forget to add the relevant using statements). Name the property
            Customers:
          </p>
          <figure>
            <pre
              class="prettyprint">public ObservableCollection&lt;Customer&gt; Customers { get; set; }</pre>
            <figcaption>Fig 03-001</figcaption>
          </figure>
          <p>
            Next we will populate the Collection. Add an instance of our repository to the ViewModel:
          </p>
          <figure>
            <pre class="prettyprint">private ICustomersRepository _repo = new CustomersRepository();</pre>
            <figcaption>Fig 03-001C</figcaption>
          </figure>
          <p>and a constructor to populate our Customers collection.</p>
          <figure>
<pre class="prettyprint">public CustomerListViewModel()
{
    Customers = _repo.GetCustomersAsync()
}</pre>
            <figcaption>Fig 03-001D</figcaption>
          </figure>

          <p>So first we might try setting the Customers collection through the repo:</p>
          <figure>
            <pre class="prettyprint">Customers = _repo.GetCustomersAsync()</pre>
            <figcaption>Fig 03-001E</figcaption>
          </figure>
          <p>But the challenge here is that this is an async method that produces a Task and not the Result and we can't
            use async and await keywords in a constructor in .Net so we will have to force the method to execute
            synchronously which you can do with the .Result property on a Task:
          </p>
          <figure>
            <pre class="prettyprint">Customers = _repo.GetCustomersAsync().Result;</pre>
            <figcaption>Fig 03-001E</figcaption>
          </figure>
          <p>Now that still doesn't produce what we need cause the repository produces a List and we need an
            ObservableCollection so we'll have to wrap the result:
          </p>
          <figure>
            <pre class="prettyprint">Customers = new ObservableCollection&lt;Customer&gt;(_repo.GetCustomersAsync().Result);</pre>
            <figcaption>Fig 03-002</figcaption>
          </figure>
          <p>Now we would generally be good to go with this but something you generally want to do if you have lines of
            code like this in the construction process that are going to do complicated things like try and go to a
            database or call a service is to add a guard condition to make sure they don't execute in the designer or
            they can break the design surface so you can't use it anymore. To do that we'll add a simple line of code:
          </p>
          <figure>
                    <pre class="prettyprint">if(DesignerProperties.GetIsInDesignMode(
new System.Windows.DependencyObject())) return;</pre>
            <figcaption>Fig 03-002A</figcaption>
          </figure>
          <p>
            to the ViewModel to prevent the execution of the above code when in the designer using the
            GetIsInDesignMode() method.
          </p>
          <p>In the CustomerListView.xaml View add a namespace to bring in the Customers subfolder and the types within
            it:
          </p>
          <figure>
            <pre
              class="prettyprint">xmlns:Class=&quot;MVVMHookupDemo.Customers.CustomerListView&quot;</pre>
            <figcaption>Fig 03-002B</figcaption>
          </figure>
          <p>
            Now we can finally hookup MVVM. To do that statically with XAML it's simply a matter of setting the
            DataContext in XAML to an instance of the ViewModel:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.DataContext&gt;
    &lt;cust:CustomerListViewModel /&gt;
&lt;/UserControl.DataContext&gt;</pre>
            <figcaption>Fig 03-003</figcaption>
          </figure>
          <p>And with that we have MVVM hooked up. Now let's prove it by adding something in that actually shows the
            data being produced by the ViewModel. Add a DataGrid to display the data:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;DataGrid ItemsSource=&quot;{Binding Customers}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 03-004</figcaption>
          </figure>

          <p>Notice the binding for the DataGrid simply presumes that the DataContext is set in the standard MVVM way
            and it can point to the properties exposed by that ViewModel specifically our Customers collection.
          </p>
          <p>Now if you run the application the DataGrid should be populated with data:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-005.png"/>
            <figcaption>Fig 03-005</figcaption>
          </figure>
          <p>We can also hook-up the View and ViewModel from the code behind with code like this (comment out the lines
            in the XAML first):
          </p>
          <figure>
<pre class="prettyprint">
public CustomerListView()
{
    this.DataContext = new CustomerListViewModel();
    IntializeComponent();
}</pre>
            <figcaption>Fig 03-006</figcaption>
          </figure>
          <p>Now we have the equation of MVVM satisfied through imperative code. We can run the application again and
            we'll see the same result. You can do that construction of the ViewModel before or after the call to
            InitializeComponent() it generally doesn’t matter.
          </p>
          <p>So those are the basics of statically hooking up your ViewModel from the View either in XAML or in
            code-behind.
          </p>
          <h2>View-First with ViewModelLocators</h2>
          <p>
            The next form of View-First construction is a meta-pattern called ViewModelLocator. This is sort of a pseudo
            pattern or common approach that is layered on top of the MVVM pattern.
          </p>
          <p>
            When doing MVVM every View has to be hooked up to its ViewModel. The ViewModelLocator is a way of
            centralising the code that takes care of that - decoupling the View more so it does not have to explicitly
            know about its ViewModel type and how to construct it.
          </p>
          <p>
            There are a number of different approaches to using ViewModelLocators. The one covered here is most similar
            to the one that is part of the Prism framework.
          </p>
          <p>
            The ViewModelLocator provides a standard, consistent, declarative and more loosely coupled way of doing
            View-First construction in that it automates the process of getting our ViewModel hooked up to our View.
          </p>
          <p>The ViewModelLocator follows the high level process below:</p>
          <ul>
            <li>The ViewModelLocator has to figure out what type is being constructed</li>
            <li>As long as you have a convention for naming Views and ViewModels the ViewModelLocator can infer what the
              ViewModel Type is associated with that View
            </li>
            <li>Once it knows the ViewModel Type needed it can construct that ViewModel – possibly using a dependency
              injection container
            </li>
            <li>Finally, it sets the Views DataContext property to the ViewModel</li>
          </ul>
          <h2>Demo: MVVM Hook-up with ViewModelLocator</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-003" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-ViewModelLocator-Start\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-003"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-004" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-ViewModelLocator-End\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-004"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo we will look at using a ViewModelLocator to wire up our View and ViewModel in a View-First
            way.
          </p>
          <p>We start this demo from the end of the previous demo. Firstly, make sure you remove the DataContext hook-up
            in XAML and code in the code behind.
          </p>
          <p>Define a ViewModelLocator class called ViewModelLocator. Make it public and static.</p>
          <figure>
                <pre class="prettyprint">namespace MVVMHookupDemo
{
    public static class ViewModelLocator
    {
    }
}</pre>
            <figcaption>Fig 03-007A</figcaption>
          </figure>
          <p>
            Use the propa code snippet to stub out a new Attached Property called AutoWireViewModel:
          </p>
          <figure>
            <pre class="prettyprint">public static bool GetAutoWireViewModel(DependencyObject obj)</pre>
            <figcaption>Fig 03-007AB</figcaption>
          </figure>
          <p>
            make its type Boolean:
          </p>
          <figure>
                <pre class="prettyprint">public static bool GetMyProperty(DependencyObject obj)
{
    return (bool)obj.GetValue(MyPropertyProperty);
}

public static void SetMyProperty(DependencyObject obj, bool value)
{
    obj.SetValue(MyPropertyProperty, value);
}

// Using a DependencyProperty as the backing store for MyProperty. This enables animation, styling, binding, etc...
public static readonly DependencyProperty MyPropertyProperty =
    DependencyProperty.RegisterAttached(&quot;MyProperty&quot;,
    typeof(bool), typeof(ViewModelLocator),
    new PropertyMetadata(false, MyPropertyChanged));</pre>
            <figcaption>Fig 03-007B</figcaption>
          </figure>
          <p>
            and make it contained within the ViewModelLocator class with a default of false.
          </p>
          <figure>
                <pre class="prettyprint">// Using a DependencyProperty as the backing store for MyProperty. This enables animation, styling, binding, etc...
public static readonly DependencyProperty MyPropertyProperty =
    DependencyProperty.RegisterAttached(&amp;quot;MyProperty&amp;quot;,
    typeof(bool), typeof(ViewModelLocator),
    new PropertyMetadata(false, MyPropertyChanged));</pre>
            <figcaption>Fig 03-007C</figcaption>
          </figure>

          <p>Don't forget to resolve dependency object by adding the System.Windows namespace.</p>
          <p>
            You now have a basic Attached Property definition. Next we will turn this into a simple Behaviour by wiring
            up a change event handler for the property. Add a handler in the PropertyMetadata called
            AutoWireViewModelChanged
          </p>
          <figure>
                <pre class="prettyprint">public static readonly DependencyProperty AutoWireViewModelProperty =
DependencyProperty.RegisterAttached(&quot;AutoWireViewModel&quot;,
typeof(bool), typeof(ViewModelLocator),
new PropertyMetadata(false, AutoWireViewModelChanged));</pre>
            <figcaption>Fig 03-008</figcaption>
          </figure>
          <p>Stub this method out:</p>
          <figure>
                <pre class="prettyprint">private static void AutoWireViewModelChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
{
    if (DesignerProperties.GetIsInDesignMode(d)) return;
    var viewType = d.GetType();
    var viewTypeName = viewType.FullName;
    var viewModelTypeName = viewType + &quot;Model&quot;;
    var viewModelType = Type.GetType(viewModelTypeName);
    var viewModel = Activator.CreateInstance(viewModelType);
    ((FrameworkElement)d).DataContext = viewModel;

}</pre>
            <figcaption>Fig 03-009</figcaption>
          </figure>
          <p>
            In the new method we want to automate the process of figuring what ViewModel to create and wiring it up to
            the View. Firstly, add a guard condition that does nothing if we are in DesignMode:
          </p>
          <figure>
            <pre class="prettyprint">if (DesignerProperties.GetIsInDesignMode(d)) return;</pre>
            <figcaption>Fig 03-009A</figcaption>
          </figure>
          <p>Next we need to get the ViewType name which we can do with a couple of lines of code:
          </p>
          <figure>
                <pre class="prettyprint">var viewType = d.GetType();
var viewTypeName = viewType.FullName;</pre>
            <figcaption>Fig 03-010</figcaption>
          </figure>
          <p>
            The first one takes the d argument that's coming into the change handler which will be the element on which
            this Attached Property is being set. We are expecting that this Attached Property will only be used on the
            root element of a View. So by getting the type of that element we know what the View type is.
          </p>
          <p>
            Then we can get the type name from the FullName property of the Type object. Next from the viewType we can
            infer a ViewModel type (as long as we are following a standard convention). And, as you've seen so far, the
            ViewModels for me are always side by side with the Views and they're inside of a feature folder or in some
            common folder together. So all we need to do is append model onto the ViewType name and we have type name of
            the ViewModel:
          </p>
          <figure>
                <pre class="prettyprint">var viewModelTypeName = viewType + &quot;Model&quot;;
var viewModelType = Type.GetType(viewModelTypeName);</pre>
            <figcaption>Fig 03-011</figcaption>
          </figure>
          <p>So with the above code we can take the viewTypeName append "Model" to it (that gives us our
            viewModelTypeName) and then we do a GetType on that to get the actual type object for our ViewModel.
          </p>
          <p>We use the Activator.CreateInstance method to create an instance of the ViewModel type.</p>
          <figure>
            <pre class="prettyprint">var viewModel = Activator.CreateInstance(viewModelType);</pre>
            <figcaption>Fig 03-012</figcaption>
          </figure>

          <p>And now we have our ViewModel instance.</p>
          <p>
            Finally, we set the DataContext of the View to the newly created ViewModel:
          </p>
          <figure>
            <pre class="prettyprint">((FrameworkElement)d).DataContext = viewModel;</pre>
            <figcaption>Fig 03-013</figcaption>
          </figure>
          <p>Now that our simple ViewModelLocator is complete we can use it to wire up our View and ViewModel.</p>
          <p>In the View add a namespace so that we can get to the ViewModelLocator type in the root of our project:
          </p>
          <figure>
            <pre class="prettyprint">xmlns:local="clr-namespace:MVVMHookupDemo"</pre>
            <figcaption>Fig 03-013A</figcaption>
          </figure>
          <p>Next on our root element which is the ViewType I add the AutoWireViewModel property:</p>
          <figure>
            <pre class="prettyprint">local:ViewModelLocator.AutoWireViewModel=&quot;True&quot;</pre>
            <figcaption>Fig 03-014</figcaption>
          </figure>
          <p>By doing that our ViewModelLocator will kick in as that property is being set and will take care of the
            wiring for us. A key thing to notice about this is the View is no longer coupled in anyway to what the type
            of it's ViewModel is or how it get's constructed. That's all been moved out to that central location inside
            the ViewModelLocator. So now not only does the ViewModel not know exactly what type it's married up to. The
            View doesn't know what it's married to in terms of a ViewModel which gives you even better decoupling.
          </p>
          <p>
            You do the exact same thing in any View that you want to hook up to a ViewModel. You just used the Attached
            Property and by convention it finds the right ViewModel for you. To emphasize this let’s add another View
            (CustomerDetailView) and associated ViewModel (CustomerDetailViewModel) in the Customers folder.
          </p>
          <p>Add a constructor to the ViewModel so we can set a breakpoint and see that it is being called:</p>
          <figure>
<pre class="prettyprint">public CustomerDetailViewModel()
{

}</pre>
            <figcaption>Fig03-014A</figcaption>
          </figure>
          <p>And again add the local namespace:</p>
          <figure>
            <pre class="prettyprint">xmlns:local="clr-namespace:MVVMHookupDemo"</pre>
            <figcaption>Fig03-014B</figcaption>
          </figure>
          <p>
            And add the AutoWireViewModel property (set to true) in the new Views XAML as we did before:
          </p>
          <figure>
            <pre class="prettyprint">local:ViewModelLocator.AutoWireViewModel="True"</pre>
            <figcaption>Fig03-014C</figcaption>
          </figure>

          <p>In the MainWindow drag the CustomerDetailView from the toolbox to the design surface (make some room for it
            first).
          </p>
          <p>Run the application.</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-014D.png"/>
            <figcaption>Fig03-014D</figcaption>
          </figure>
          <p>You can see that we are hitting the breakpoint in our ViewModel's constructor because it was auto wired up
            and our previous view is getting it's ViewModel data so that's all wired up as well:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-014DA.png"/>
            <figcaption>Fig03-014DA</figcaption>
          </figure>

          <p>The advantages of using a ViewModelLocator are:</p>
          <ul>
            <li>A standard declaration in every View</li>
            <li>The View is not coupled to its particular ViewModel Type other than through the conventions of the
              ViewModelLocator
            </li>
            <li>If that ViewModelLocator is written in a flexible way to be able to override those conventions and also
              possibly do something like use a container internally to construct the ViewModel it can do dependency
              injection in that process (we will see a demo of this later when we get to the Prism framework that has a
              ViewModelLocator in it)
            </li>
          </ul>
          <h2>Data Binding Support for MVVM</h2>
          <p>
            Data binding is the key feature that differentiates MVVM from other UI separation patterns like MVC and MVP.
            For data binding to work you need to have a View or set of UI elements constructed:
          </p>

          <figure>
                <pre class="prettyprint">&lt;UserControl x:Class=&quot;...&quot; ...&gt;
    &lt;Grid&gt;
        ...
        &lt;Label Content=&quot;First Name:&quot; ... /&gt;
        &lt;TextBox ... Text=&quot;{Binding Customer.FirstName&quot; /&gt;
        &lt;Label Content=&quot;Last Name:&quot; ... /&gt;
        &lt;TextBox ... Text=&quot;{Binding Customer.LastName&quot; /&gt;
        &lt;Button ... Command=&quot;{Binding SaveCommand}&quot; /&gt;
    &lt;/Grid&gt;
&lt;/UserControl&gt;</pre>
            <figcaption>Fig 03-014DB</figcaption>
          </figure>
          <p>
            You also need another object that the bindings will point to:
          </p>
          <figure>
                <pre class="prettyprint">public class CustomerEditViewModel
    : INotifyPropertyChanged
{
    public Customer Customer
    {
        ...
    }

    public ICommand SaveCommand { get; set; }
}</pre>
            <figcaption>Fig 033-014DC</figcaption>
          </figure>
          <p>
            In MVVM the main thing the elements in your View bind to are properties exposed by the ViewModel. The order
            that the View and ViewModel are constructed depend on the situation in the application. We've already looked
            at several ways to do View first and later in this module we'll look at how to do ViewModel first.
          </p>
          <p>Whichever order that happens in and wherever the code resides ultimately a View and ViewModel get
            constructed and the DataContext of the View gets set to the ViewModel.
          </p>
          <p>
            Because of the way a DataContext works in XAML the DataContext set at the root element also becomes the
            DataContext for every child element (unless it explicitly sets the DataContext property to something else or
            it is being rendered out as part of an Items control which sets the DataContext to the item).
          </p>
          <p>
            Then child elements in the View have the opportunity to bind to properties exposed by the ViewModel whether
            those properties expose model objects, discrete values or commands.
          </p>
          <p>
            Depending on the element property and what it's bound to in the ViewModel those bindings can form a one way
            or bi-directional communication path to flow data back and forth between the View and ViewModel as well as
            setting up Command or Behaviour based communication paths:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-014E.png"/>
            <figcaption>Fig03-014E</figcaption>
          </figure>
          <p>Let's look at data binding in action supporting MVVM in a demo.</p>
          <h2>Demo: Data Binding for MVVM Data Flows</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-005" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataBinding-Start\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-005"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-006" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataBinding-End\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-006"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>
            In this demo we will review how data binding works and show how it supports the ViewModel and Model Types.
            The starting point for this one is the end of the XAML wire up demo at the beginning of the module.
          </p>
          <p>
            Open the CustomerListView. Replace the previous DataGrid (which by default has AutoGenerateColumns set to
            true) with one that specifies more explicit column definitions:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;DataGrid x:Name=&quot;customerDataGrid&quot;
              AutoGenerateColumns=&quot;False&quot;
              EnableRowVirtualization=&quot;True&quot;
              ItemsSource=&quot;{Binding Customers}&quot;
              RowDetailsVisibilityMode=&quot;VisibleWhenSelected&quot;&gt;
        &lt;DataGrid.Columns&gt;
            &lt;DataGridTextColumn x:Name=&quot;firstNameColumn&quot;
                                Binding=&quot;{Binding FirstName}&quot;
                                Header=&quot;First Name&quot;
                                Width=&quot;SizeToHeader&quot; /&gt;
            &lt;DataGridTextColumn x:Name=&quot;lastNameColumn&quot;
                                Binding=&quot;{Binding LastName}&quot;
                                Header=&quot;Last Name&quot;
                                Width=&quot;SizeToHeader&quot; /&gt;
            &lt;DataGridTextColumn x:Name=&quot;phoneColumn&quot;
                                Binding=&quot;{Binding Phone}&quot;
                                Header=&quot;Phone&quot;
                                Width=&quot;SizeToHeader&quot; /&gt;
        &lt;/DataGrid.Columns&gt;
    &lt;/DataGrid&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 03-015</figcaption>
          </figure>
          <p>
            The DataGrid is still bound to the Customers collection exposed by our ViewModel but we have individual
            column definitions which have their own Bindings. As discussed before this ItemSource is able to bind to the
            Customers property because the overall DataContext for the View was set to the ViewModel.
          </p>
          <p>These bindings down here are also DataContext bindings:</p>
          <figure>
                <pre class="prettyprint">&lt;DataGridTextColumn x:Name=&quot;firstNameColumn&quot;
                        Binding=&quot;{Binding FirstName}&quot;
                        Header=&quot;First Name&quot;
                        Width=&quot;SizeToHeader&quot; /&gt;
    &lt;DataGridTextColumn x:Name=&quot;lastNameColumn&quot;
                        Binding=&quot;{Binding LastName}&quot;
                        Header=&quot;Last Name&quot;
                        Width=&quot;SizeToHeader&quot; /&gt;
    &lt;DataGridTextColumn x:Name=&quot;phoneColumn&quot;
                        Binding=&quot;{Binding Phone}&quot;
                        Header=&quot;Phone&quot;
                        Width=&quot;SizeToHeader&quot; /</pre>
            <figcaption>Fig 03-015A</figcaption>
          </figure>
          <p>
            but they are not binding against the ViewModel itself because of the way an ItemSource works. When an
            ItemSource binds to it's collection it renders out a container for each item it's rendering and it sets the
            DataContext for that container to the item. So the overall DataContext for each cell within a row here is
            going to be and individual Customer in that collection. So these bindings can just use the simple path
            syntax here to point to properties on the individual customer that the row is being rendered out for.
          </p>
          <p>
            Now to see things in action here we're going to go expand some of our properties. So let me go to my
            CustomerListViewModel and drop down to my Customer property and expand it to have a backing member variable.
          </p>
          <figure>
<pre class="prettyprint">public ObservableCollection&lt;Customer&gt; Customers
{
    get
    {
        return customers;
    }
    set
    {
        customers = value;
    }
}</pre>
            <figcaption>Fig03-015B</figcaption>
          </figure>
          <p>Likewise, I'm going to drop into the Customer Model object type and find the FirstName property and expand
            it:
          </p>
          <figure>
                <pre class="prettyprint">private string firstName;
public string FirstName
{
    get
    {
        return _firstName;
    }
    set
    {
        _firstName = value;
    }
}</pre>
            <figcaption>Fig03-015C</figcaption>
          </figure>
          <p>Now we can go back to our ViewModel and I'm going to set a break point on the setter of the Customers
            property and on the line of code in our constructor that's actually going to try and set that by going out
            to the repository and getting Customers:
          </p>
          <figure>
                <pre class="prettyprint">public CustomerListViewModel()
{
    if (DesignerProperties.GetIsInDesignMode(
        new System.Windows.DependencyObject())) return;

    Customers = new ObservableCollection&lt;Customer&gt;( _repository.GetCustomersAsync().Result);
}

public ObservableCollection&lt;Customer&gt; Customers
{
    get
    {
        return _customers;
    }
    set
    {
        _customers = value;
    }
}</pre>
            <figcaption>Fig 03-015D</figcaption>
          </figure>
          <p>And then I'll drill down into that Customers repository to the GetCustomers method and set a breakpoint
            here:
          </p>
          <figure>
                <pre class="prettyprint">public Task&lt;List&lt;Customer&gt;&gt; GetCustomersAsync()
{
    return _context.Customers.ToListAsync();
}</pre>
            <figcaption>Fig 03-015E</figcaption>
          </figure>
          <p>So if I start up now basically XAML parsing is happening, starting at the top and it's trying to construct
            our ViewModel. So it comes into our ViewModel constructor now and it's trying to execute this line of code:
          </p>
          <figure>
                <pre class="prettyprint">Customer = new ObservableCollection&lt;Customer&gt;(
    _repository.GetCustomersAsync().Result);
                </pre>
            <figcaption>Fig03-015F</figcaption>
          </figure>
          <p>Which means it first has to go execute GetCustomersAsync. If I hit F5 to continue we'll hit the line of
            code inside the repository that is doing an async call to the database to get the Customers back:
          </p>
          <figure>
            <pre class="prettyprint">return context.Customers.ToListAsync();</pre>
            <figcaption>Fig03-015G</figcaption>
          </figure>
          <p>And then when that call completes, if I hit F5 again, now we see we're in the set block for our Customers
            property cause this property setter up here is being called.
          </p>
          <p>Now if I go ahead and put a break point on the get block for the Customer:</p>
          <figure>
                <pre class="prettyprint">get
{
    return _customers; // breakpoint on this line
}
</pre>
            <figcaption>Fig03-015H</figcaption>
          </figure>
          <p>and the get block for the Customer FirstName property in the Customer model object:</p>
          <figure>
                <pre class="prettyprint">get
{
    return _firstName; // breakpoint on this line
}
</pre>
            <figcaption>Fig03-015I</figcaption>
          </figure>

          <p>and go ahead an run again. Now we see the get block of the Customers property is being called:</p>
          <figure>
                <pre class="prettyprint">public ObservableCollection&lt;Customer&gt; Customers
{
    get
    {
        return _customers;
    }
    set
    {
        _customers = value;
    }
}</pre>
            <figcaption>Fig 03-015J</figcaption>
          </figure>
          <p>And this is the data binding that's in the View right here:</p>
          <figure>
                <pre class="prettyprint">&lt;DataGrid x:Name=&quot;customerDataGrid&quot;
      AutoGenerateColumns=&quot;False&quot;
      EnableRowVirtualization=&quot;True&quot;
      ItemsSource=&quot;{Binding Customers}&quot;
      RowDetailsVisibilityMode=&quot;VisibleWhenSelected&quot;&gt;
&lt;DataGrid.Columns&gt;</pre>
            <figcaption>Fig 03-015K</figcaption>
          </figure>
          <p>on the ItemsSource that now needs to be resolved and is going to pull those Customers into the DataGrid. If
            we execute further now we can see the getter of each Customer object, first Derek:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015L.png"/>
            <figcaption>Fig03-015L</figcaption>
          </figure>
          <p>Then Bernard, then Jordan:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015M.png"/>
            <figcaption>Fig03-015M</figcaption>
          </figure>
          <p>as it's rendering out the individual rows of the DataGrid.</p>
          <p>Now if we go ahead and run past all of that:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015N.png"/>
            <figcaption>Fig03-015N</figcaption>
          </figure>
          <p>because this DataGrid is editable by default we can see the bi-directional nature of the bindings which
            allows us to communicate back down into those ViewModel Properties or Model Properties.
          </p>

          <p>In this case I'm going to set a break point on the set block of the Customer and we'll go ahead and edit
            Derek's first name here in the UI:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015O.png"/>
            <figcaption>Fig03-015O</figcaption>
          </figure>
          <p>Now the way the DataGrid works by default is that I can tab off that field and it's going to buffer those
            changes in memory until I actually change focus off of the row and then it actually goes and sets all of
            those properties that were modified as part of that editing process.
          </p>
          <p>So now we can see the setter being called for this FirstName property because we edited it:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015P.png"/>
            <figcaption>Fig03-015P</figcaption>
          </figure>
          <p>So you can see that the data bindings to ViewModel Properties and to Model Properties form a bidirectional
            communication path - first to pull data into the View from the ViewModel or Model properties and then to
            push data back down when things change in the View.
          </p>
          <h2>ViewModel-First Construction with DataTemplates</h2>
          <p>
            ViewModel-First leverages the capabilities of implicit Data Templates in WPF. Implicit data templates can
            automatically select an appropriate template from the current Resource Dictionary for an element that is
            using data binding. They do this based on the type of the data object that is being rendered by the data
            binding.
          </p>
          <p>
            The way this works is that you first have some element that is binding to a Data Object:
          </p>
          <figure>
            <pre class="prettyprint">&lt;ContentControl Content="{Binding CurrentViewModel}" /&gt;</pre>
            <figcaption>Fig03-015Q</figcaption>
          </figure>
          <p>When the property that is being bound on the control drives the rendered content on that control (such as
            ContentControl Content property or an ItemsControl ItemSource property) the control will look at the object
            produced by the binding. If it’s a UI element the control will just render the element as content based on
            its layout scheme for children but if the object produced by the binding is not a UI element such as a
            ViewModel instance
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015R.png"/>
            <figcaption>Fig03-015R</figcaption>
          </figure>
          <p>the Control will go and look at the current Resource Dictionary that is in scope for the element and see if
            it can locate a Data Template that is mapped to the type of the object that is being produced by the
            binding:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015S.png"/>
            <figcaption>Fig03-015S</figcaption>
          </figure>
          <p>If it finds a match it creates an instance of the root element found in that data template:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015T.png"/>
            <figcaption>Fig03-015T</figcaption>
          </figure>
          <p>which implicitly causes the construction of any Child elements. Then it renders that element as the Child
            content after having set the DataContext property of the root element to the Data Object instance that
            kicked of the whole process:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015U.png"/>
            <figcaption>Fig03-015U</figcaption>
          </figure>
          <p>Which in this example means the DataContext of the Child View is set to its ViewModel marrying them up
            properly for MVVM.
          </p>
          <h2>Demo: Explicit and Implicit DataTemplates</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-006" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataTemplates-Start\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-006"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-007" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataTemplates-End\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-007"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>Now let’s look at how you do ViewModel-First leveraging data templates (specifically implicit data
            templates).
          </p>
          <p>
            Starting point for this demo is the beginning of the module where we had our CustomersListView all hooked up
            through XAML and in the case of our ViewModel it's pretty much unchanged it just exposes that Customers
            property and populates it on construction:
          </p>
          <figure>
                <pre class="prettyprint">public class CustomerListViewModel
{
    private ObservableCollection&lt;Customer&gt; _customers;
    private ICustomersRepository _repository = new CustomersRepository();

    public CustomerListViewModel()
    {
        if (DesignerProperties.GetIsInDesignMode(
            new System.Windows.DependencyObject())) return;

        Customers = new ObservableCollection&lt;Customer&gt;( _repository.GetCustomersAsync().Result);
    }

    public ObservableCollection&lt;Customer&gt; Customers
    {
        get
        {
            return _customers;
        }
        set
        {
            _customers = value;
        }
    }
}</pre>
            <figcaption>Fig 03-015UA</figcaption>
          </figure>
          <p>
            The first step is to use Data Templates in a basic Data Binding scenario. Split the DataGrid into two rows
            of equal height:
          </p>

          <figure>
                <pre class="prettyprint">&lt;Grid.RowDefinitions&gt;
    &lt;RowDefinition Height=&quot;*&quot; /&gt;
    &lt;RowDefinition Height=&quot;*&quot; /&gt;
&lt;/Grid.RowDefinitions&gt;</pre>
            <figcaption>Fig 03-015V</figcaption>
          </figure>

          <p>The DataGrid will fall into the first row and we're going to add a ListBox into the second row with a
            Binding to the Customers property (the same one the DataGrid is bound to):
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox Grid.Row=&quot;1&quot;
     ItemsSource=&quot;{Binding Customers}&quot; /&gt;</pre>
            <figcaption>Fig 03-015VA</figcaption>
          </figure>
          <p>
            If you run now what we're seeing is Zza.Data.Customer for each Customer:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-015W.png"/>
            <figcaption>Fig03-015W</figcaption>
          </figure>
          <p>What's actually happening there is that when the binding gets the object it looks and sees if it's a UI
            element and if so if can just render it out. If not it just ToString()'s the object if it's not told about a
            data template or can't locate one through implicit templates. So to fix this with implicit templates let's
            go and define a data template.
          </p>
          <p>For that I'm going to go up to the root here and add a Resources section to the root containing a
            DataTemplate called CustomerTemplate:
          </p>
          <figure>
                <pre class="prettyprint">&lt;UserControl.Resources&gt;
    &lt;DataTemplate x:Key=&quot;CustomerTemplate&quot;&gt;
        &lt;Border BorderThickness=&quot;3&quot;
                BorderBrush=&quot;Blue&quot;&gt;
            &lt;StackPanel&gt;
                &lt;TextBlock Text=&quot;{Binding FirstName}&quot; /&gt;
                &lt;TextBlock Text=&quot;{Binding LastName}&quot; /&gt;
                &lt;TextBlock Text=&quot;{Binding Phone}&quot; /&gt;
            &lt;/StackPanel&gt;
        &lt;/Border&gt;
    &lt;/DataTemplate&gt;
&lt;/UserControl.Resources&gt;</pre>
            <figcaption>Fig 03-016</figcaption>
          </figure>
          <p>So we can see here this is just a DataTemplate containing a StackPanel. It's got a key of CustomerTemplate.
            And then to actually use the template, we would go back to the ListBox and use the ItemTemplate property:
          </p>
          <figure>
                <pre class="prettyprint">&lt;ListBox ItemsSource=&quot;{Binding Customers}&quot;
    ItemTemplate=&quot;{StaticResource CustomerTemplate}&quot;
    Grid.Row=&quot;1&quot; /&gt;</pre>
            <figcaption>Fig 03-017</figcaption>
          </figure>
          <p>So now you can see we instruct the ListBox to go use that specific template for rendering out those
            customers and now when we run we will get that presentation of firstname, lastname, and phone for each
            Customer:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-018.png"/>
            <figcaption>Fig03-018</figcaption>
          </figure>
          <p>
            To make this an implicit template we remove the ItemTemplate from the ListBox, go back to the Template
            definition and instead of a key we would give it a DataType:
          </p>
          <figure>
            <pre class="prettyprint">&lt;DataTemplate DataType=&quot;{x:Type data:Customer}&quot;&gt;</pre>
            <figcaption>Fig 03-019</figcaption>
          </figure>
          <p>Using the x:Type markup extension here is very important. If you've been exposed to Silverlight or other
            XAML languages that don't have a x:Type markup extension you might be tempted to just put data:Customer
            there for the DataType but it wouldn't work in WPF. You have to use the x:Type markup extension which is
            like a type of operator in XAML. So we basically point to the Customer data type which is out in our
            Zza.Data namespace which I already have an XML namespace defined for at the top.
          </p>
          <figure>
            <pre class="prettyprint">xmlns:data=&quot;clr-namespace:Zza.Data;assembly=Zza.Data&quot;</pre>
            <figcaption>Fig 03-020</figcaption>
          </figure>
          <p>And now when we run we still get the rendering of the Customers as we did before with their DataTemplate
            because it's automatically mapping the type of the object being rendered, locating the appropriate
            DataTemplate out of the Resources and applying that as the way it visually renders that Customer.
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-020A.png"/>
            <figcaption>Fig03-020A</figcaption>
          </figure>
          <p>Next let's take a look at how this can be leveraged for wiring up Views and ViewModels.</p>
          <h2>Demo: Implicit DataTemplates for ViewModel-First MVVM Hook-up</h2>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-008" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataTemplates-Start\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-008"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex03-009" type="text"
                     value="C:\DevelopmentTutorials\Pluralsight-Courses\WPF MVVM In Depth\Module 3\MVVMHookupDemo-DataTemplates-End\MVVMHookupDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex03-009"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>Now we want to use DataTemplates to wire up our View and ViewModel. To do this you generally want to have a
            hierarchical scheme which we'll get into later but first off we're going to add a ViewModel to our
            MainWindow
          </p>
          <p>
            Add a CurrentViewModel property to this class. For demo purposes statically wire this up to an instance of
            the CustomerListViewModel. So we are exposing that child ViewModel now as something that can be data bound
            to from elements within the MainWindow.
          </p>
          <figure>
                <pre class="prettyprint">namespace MVVMHookupDemo
{
    public class MainWindowViewModel
    {
        public MainWindowViewModel()
        {
            CurrentViewModel = new CustomerListViewModel();
        }
        public object CurrentViewModel { get; set; }
    }
}</pre>
            <figcaption>Fig 03-020B</figcaption>
          </figure>
          <p>
            The next step is to wire this up as the ViewModel for the MainWindow. We could use a ViewModelLocator for
            this step but for this demo we will wire it statically in the XAML:
          </p>

          <figure>
                <pre class="prettyprint">&lt;Window xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
    xmlns:Customers=&quot;clr-namespace:MVVMHookupDemo.Customers&quot;
    xmlns:local=&quot;clr-namespace:MVVMHookupDemo&quot;
    x:Class=&quot;MVVMHookupDemo.MainWindow&quot;
    Title=&quot;MainWindow&quot;
    Height=&quot;350&quot;
    Width=&quot;525&quot;&gt;
&lt;Window.DataContext&gt;
    &lt;local:MainWindowViewModel /&gt;
&lt;/Window.DataContext&gt;
&lt;Grid&gt;
    &lt;ContentControl Content=&quot;{Binding CurrentViewModel}&quot; /&gt;
&lt;Grid/&gt;</pre>
            <figcaption>Fig 03-021</figcaption>
          </figure>
          <p>First step is to add a namespace for the root folder and then add our standard static XAML wire up of a
            ViewModel setting the DataContext to instance of the ViewModel. Then finally to do this ViewModel first wire
            up we're going to replace the static instance of the View here:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;Customers:CustomerListView /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 03-021A</figcaption>
          </figure>
          <p>with a ContentControl:</p>
          <figure>
                <pre class="prettyprint">&lt;Grid&gt;
    &lt;ContentControl Content=&quot;{Binding CurrentViewModel}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 03-021B</figcaption>
          </figure>
          <p>and that ContentControl's Content property is going to be bound to that CurrentViewModel property on the
            MainWindowViewModel which we know contains a CustomerListViewModel:
          </p>
          <p>Now, again, if we were to run at this point:</p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-021C.png"/>
            <figcaption>Fig03-021C</figcaption>
          </figure>
          <p>We would just get a ToString of that type as it tries to render out that object. But if we go into
            MainWindow and add into it's resources a DataTemplate that is mapped by type to the CustomerListViewModel
            that's being rendered out then we can render the appropriate visual structure for that which in our case is
            already defined as it's View
          </p>
          <figure>
                <pre class="prettyprint">&lt;DataTemplate DataType=&quot;{x:Type Customers:CustomerListViewModel}&quot;&gt;
    &lt;Customers:CustomerListView /&gt;
&lt;/DataTemplate&gt;</pre>
            <figcaption>Fig 03-021D</figcaption>
          </figure>
          <p>So if we just make the Content of the DataTemplate be a ViewType and map the DataType to it's corresponding
            ViewModel Type and that ViewModel type is rendered out through a Binding into a Container control like a
            ContentControl or an items Control:
          </p>
          <figure>
                <pre class="prettyprint"> &lt;Grid&gt;
    &lt;ContentControl Content=&quot;{Binding CurrentViewModel}&quot; /&gt;
&lt;/Grid&gt;</pre>
            <figcaption>Fig 03-021E</figcaption>
          </figure>
          <p>Then the magic of implicit DataTemplates kicks in and as part of trying to render out this content it will
            go out to the Resources, it will locate a DataTemplate that's mapped to the appropriate type and then it
            will render it's Contents setting the DataContext of that root element to that Data object which is our
            ViewModel thereby satisfying the equation of MVVM.
          </p>
          <p>To see that in action let's go ahead and run and you can see we're back in business with our View:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-021F.png"/>
            <figcaption>Fig03-021F</figcaption>
          </figure>
          <p>Just one final reminder because I screw it up all the time myself. Make sure you use that x:Type mark-up
            extension to specify the type that you are mapping to. Don't just put the typename or you'll silently get
            nothing.
          </p>
          <h2>No One’s on First</h2>
          <p>The last scenario to consider is a case where the View doesn’t construct the ViewModel or vice a versa.
          </p>
          <p>
            Sometimes a separate chunk of code that simply constructs an instance of each and then sets the DataContext
            of the View to the ViewModel:
          </p>
          <figure>
            <img src="./images/wpfmvvmindepth/Fig03-021G.png"/>
            <figcaption>Fig03-021G</figcaption>
          </figure>
          <p>An example of this would be a Client Service that manages pop up dialogs to be presented to the user. When
            a given popup is requested by a Command (say a tools/options dialog) the code in the client service could do
            the construction of each, wire them together and place them into a popup window and show it.
          </p>
          <p>Most of the time you will be doing ViewModel-First or View-First depending on whether there's a static
            relationship between the View and The ViewModel or if it's a more dynamic scenario but don't feel like you
            always have to take that approach. As long as you meet the goals that neither the View or ViewModel is
            tightly coupled and they get constructed properly and married together through the DataContext your doing
            MVVM just fine.
          </p>
          <h2>Summary</h2>
          <p>In this module I showed you a number of ways you can get your Views and ViewModels hooked up or married as
            many people call it. You saw how to do:
          </p>
          <ul>
            <li>View-First Construction through declarative XAML wiring</li>
            <li>View-First Construction via code behind</li>
            <li>Using a simple ViewModelLocator</li>
          </ul>
          <p>You saw how data binding forms the basic glue of MVVM including the DataContext being the ring that binds
            the View and the ViewModel as well as the data bindings being the communication channels through which data
            flows in both directions.
          </p>
          <p>You also saw that through the mechanisms of DataTemplates which themselves rely on data binding you can
            dynamically create an appropriate View for a ViewModel by placing an instance of a ViewModel into a
            databound Container control.
          </p>
          <p>In the next module we'll take a look at how Views and ViewModels communicate with each other as things
            happen in the application including Commands, Behaviours and Property Change Notifications. At which point
            you'll have all the basics of MVVM nailed.
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WPFMVVMInDepth03HookingUpViewsAndViewModelsInMVVM'
}
</script>

<style scoped>

</style>
