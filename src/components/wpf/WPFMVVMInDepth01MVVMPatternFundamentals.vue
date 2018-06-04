<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>MVVM Pattern Fundamentals</h2>
                </div>
                <div class="panel-body">
                    <h3 id="Welcome">Welcome</h3>
                    <p>
                        Every good WPF developer wants to write great applications that delight their users. You may be able
                        to achieve that on a first release without putting a lot of consideration into the structure of your
                        application code and what code belongs where. But if you want to keep adding features, fixing bugs
                        and getting releases out over time, without your delivery times constantly increasing due to code
                        complexity, you need to have good clean structure to your code.
                    </p>
                    <p>
                        The MVVM pattern is all about guiding you in how to organize and structure your code to write
                        maintainable, testable and extensible applications. This first module is going to cover the high
                        level concepts of MVVM. Make sure you understand what it does for you, why you would want to use it,
                        where it comes from and some of the high level concepts around the structural parts of MVVM.
                    </p>
                    <h3 id="SeparationOfConcerns">Separation of Concerns</h3>
                    <p>
                        First thing to understand about MVVM is that it is mostly about providing a standard structure for
                        you to apply the principle of separation of concerns. Now that's a pretty lofty phrase that people
                        throw around without really explaining it so let's talk briefly about what it really means.
                    </p>
                    <p>
                        To explain separation of concerns I like to use an analogy of something we all have to do:
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-001.png"/>
                        <figcaption>Fig 01-001</figcaption>
                    </figure>
                    <p>
                        Get dressed to go out in public. If you take your laundry and put it away as it comes out of the
                        clothes drier – all twisted and tangled with intermingled articles of clothing and stuff them into
                        an available hole in your drawers or shelves that can really expedite the process of putting away
                        your clothes at that moment in time.
                    </p>
                    <p>
                        However, you will pay an ongoing penalty each day when you need to get dressed because you will have
                        to dig around to find a matching and complete outfit from the tangled mess of clothing.
                    </p>
                    <p>
                        If, on the other hand, you invest a little bit of time upfront to put the structure in place to
                        organize your clothes, buy a chest of drawers, put in some shelves, put clothes away neatly each
                        time the laundry is finished then the daily activity of getting dressed becomes a breeze.</p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-002.png"/>
                        <figcaption>Fig 01-002</figcaption>
                    </figure>
                    <p>
                        Developers face a very similar choice with the way we write code.
                    </p>
                    <h3 id="SeparationOfConcernsInMVVM">Separation of Concerns in MVVM</h3>
                    <p>
                        Code like the example below doesn’t look too bad at first glance:
                    </p>
                    <figure>
                <pre class="prettyprint"><code>private void ComputeCustomerOrdersTotal(object sender, RoutedEventArgs e)
{
    var selectedCustomer = this.customerDataGrid.SelectedItem as Customer;
    var orders = (from order in dbContext.Orders.Include(&quot;OrderItems&quot;)
        where order.CustomerId = selectedCustomer.Id
        select order);

    var sum = 0;
    foreach (var order in orders)
    {
        foreach (var item in order.OrderItems)
        {
            sum += item.UnitPrice * item.Quantity;
        }
    }
    this.customerOrderDetail.text = sum.ToString();
}</code></pre>
                        <figcaption>Fig 01-003</figcaption>
                    </figure>
                    <p>
                        If you look closely at what the code is doing you can see code that is touching UI elements,
                        interwoven with code that is doing data access, interwoven with business logic or interaction logic
                        code. Now take this out of a slides worth of code and put it into the context of real world methods
                        that I'm sure we have all either written or been asked to maintain where you have the same kind of
                        interleaving of concerns but spread across a method that is hundreds or thousands of lines of code
                        long. This the code equivalent of taking your tangled mess of clothing and stuffing it in a drawer.
                        The developer who wrote this code has tangled up a bunch of different concerns and put them all in
                        one place.
                    </p>
                    <p>
                        At some point after that, probably on a somewhat ongoing basis, another developer is going to be
                        tasked with adding a feature or fixing a bug that requires digging into this tangle and making
                        changes. That poor soul is going to have to deal with a heap of complexity that goes well beyond
                        whatever specific problem they are trying to address at the moment and that added complexity because
                        the developer who originally wrote the code did not take the time to put things in their proper
                        place up front.
                    </p>
                    <p>So what does MVVM do to address this? Think of it as a set of shelves and drawers that are
                        pre-defined and well labelled so that each time you go to write code of a certain nature you have a
                        specific place you should be putting it. There is a shelf for:
                    </p>
                    <ul>
                        <li>UI Element Access - that is your View definitions.</li>
                        <li>View Interaction Logic – that is you're ViewModels.</li>
                        <li>Model Entities – that is your Data Model Objects</li>
                    </ul>
                    <p>Any true Business Logic should probably be in a separate layer or behind a service boundary along
                        with data access being well separated from what the UI is doing directly. You might also have some
                        shared client-side logic that's used by multiple views. And that has it's own shelf too.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-004.png"/>
                        <figcaption>Fig 01-004</figcaption>
                    </figure>
                    <p>The specific way you setup your shelves and drawers is not really important, it depends on the
                        solution you are working in, the team that your on, and some personal preference but having well
                        defined places for different kinds of code to go and a good sense of what code goes there is very
                        important and is really what MVVM is meant to guide you in doing for developing client application
                        code.
                    </p>
                    <h3 id="MVVMGoalsAndBenefits">MVVM Goals and Benefits</h3>
                    <p>Beyond achieving separation of concerns and the efficiency that you gain from having that; what are
                        you really trying to gain from using the MVVM pattern. There are really three key things that flow
                        out of applying MVVM.
                    </p>
                    <ul>
                        <li>Maintainability - having that clean separation of different kinds of code should make it easier
                            to go into one or several of those granular or more focused parts and make changes without
                            worrying as much about introducing new bugs or breaking existing features. That means you can
                            remain agile and keep cranking out new releases quickly.
                        </li>
                        <li>Testability - with MVVM each piece of code is more granular and if done right your external
                            dependencies and UI dependencies are in separate pieces of code from the parts with the core
                            logic that you would really want to unit test. That makes it a lot easier to write unit tests
                            against that core logic, make sure it works right when written and keeps working even when
                            things change in maintenance. Now that being said a lot of teams don't even get round to writing
                            unit tests or just haven't convinced themselves of the benefits of doing so. That's kind of a
                            whole separate topic. I'm not going to focus on unit testing in this course but strongly
                            encourage you to consider unit testing your ViewModel and client services project with a decent
                            degree of coverage.
                        </li>
                        <li>Extensibility - somewhat overlaps with maintainability because of the clean separation
                            boundaries and more granular pieces of code you have a better chance of making any of those
                            parts more pluggable and being able to replace or add new pieces of code that do similar things
                            into the right places in the architecture.
                        </li>
                    </ul>
                    <h3>Related UI Separation Patterns</h3>
                    <p>
                        Another thing I think is useful to be aware of is where MVVM came from. MVVM is really an evolution
                        of other UI separation patterns.In the early 70’s when mainframes or terminals were heavily used the
                        Model View Controller pattern was first defined. This pattern was about rendering a screen of
                        information to the user, collecting some input from them and rendering the next screen of
                        information to them. As a result of that Request/Response nature it is still a good fit for the
                        modern web and so is used by platforms such as ASP.Net MVC, Ruby on Rails and Angular.
                    </p>
                    <p>
                        One of the key distinctions between MVVM and MVC is that there is typically a decoupled lifetime
                        between the Controller and the View. The Controller produces a View but may not stick around after
                        that until a new request comes in from the user.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-005.jpg"/>
                        <figcaption>Fig 01-005</figcaption>
                    </figure>
                    <p>
                        In the mid 2000’s – Rich/Smart applications were getting a lot of attention. As a result, people
                        started trying to use separation patterns there. However, because the client Views were more
                        state-full and stuck around in memory as did their supporting interaction logic, the MVC pattern was
                        not the perfect fit. What evolved was a nuance on the MVC pattern which was called the Model View
                        Presenter. The distinction of a Presenter versus a Controller was mostly that the lifetime of the
                        Presenter and the View were coupled and they generally had a more ongoing conversation as the user
                        interacted with the View - mostly in the form of method calls back and forth between the two parts.
                    </p>
                    <p>
                        Finally, that led to the newer MVVM pattern which was first defined in the early days of WPF by the
                        Expression team at Microsoft. The main difference here is that we are still dealing with rich
                        desktop client applications and Views that stick around for longer interaction with the user. The
                        WPF platform offers really rich data-binding so MVVM is really a nuance on MVP where the explicit
                        method calls between the View and its counterpart are replaced by Two-Way Databinding flowing data
                        and communications between the View and the ViewModel.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-006.png"/>
                        <figcaption>Fig 01-006</figcaption>
                    </figure>
                    <h3>MVVM across Platforms</h3>
                    <p>
                        Since most WPF developers will not be coding exclusively for WPF you should be aware that MVVM can
                        be used on most modern client applications today such as:
                    </p>
                    <ul>
                        <li>WPF</li>
                        <li>Silverlight</li>
                        <li>Windows 8/WinRT</li>
                        <li>HTML 5 (Knockout/Angular)</li>
                        <li>Xamarin/Mobile Apps</li>
                        <li>Windows 10</li>
                    </ul>
                    <h3>MVVM Responsibilities</h3>
                    <p>
                        Each part of the MVVM pattern has a distinct responsibility. MVVM is really a layered architecture
                        for the client side. The Presentation layer is composed of the Views, the Logic Layer are the
                        ViewModels and the Persistence Layer is the combination of the Model Objects and the Client Services
                        that produce and persists them either via data access in a two-tier application or via service calls
                        in an n-tier application.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-007.png"/>
                        <figcaption>Fig 01-007</figcaption>
                    </figure>
                    <h3>Model Responsibilities</h3>
                    <p>
                        The Model is really the client side data model that supports the Views in the application. It is
                        composed of objects with properties and backing member variables that hold the discreet pieces of
                        data in memory.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-008.png"/>
                        <figcaption>Fig 01-008</figcaption>
                    </figure>
                    <p>
                        Some of those properties may reference other Model objects forming the object graph that is the
                        model object as a whole. The Model objects may also expose computed properties (properties whose
                        value is computed based on the value of other properties in the model (e.g. FullName) or information
                        from the client execution context (e.g. Time).
                    </p>
                    <p>
                        Because you will often be binding to Model properties the Model objects should raise Property Change
                        Notifications. For WPF data-binding this means implementing the INotifyPropertyChanged interface and
                        firing the PropertyChanged event in property Set block.
                    </p>
                    <p>
                        The last responsibility is optional but often you will embed Validation information on the model
                        objects so it can work with the WPF data-binding validation features through Interfaces such as
                        INotifyDataErrorInfo and IDataErrorInfo.
                    </p>
                    <h3>View Responsibilities</h3>
                    <p>
                        The Views responsibility is to define the structure of what the user sees on the screen. That
                        structure can be composed of static and dynamic parts. Static being the XAML hierarchy that defines
                        the controls and layout of controls that the View is composed of and dynamic being any animations or
                        state changes that are defined as part of the View.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-009.png"/>
                        <figcaption>Fig 01-009</figcaption>
                    </figure>
                    <p>
                        There is an overarching goal in MVVM to have “no code behind” in the View. I put no code behind in
                        quotes here because it's impossible to have zero code-behind. You at least need the constructor and
                        call to InitializeComponent() that triggers XAML parsing as the the View is being constructed but
                        the idea is to resist the urge to start dropping event handling code in the code-behind and coding
                        up the interaction and data manipulation logic there. There are also other types of code that have
                        to go in the code-behind. Any code that's required to have a reference to a UI element is inherently
                        view code. Things like animations expressed in code instead of XAML are one example and many
                        controls have parts of their API that is not conducive to data binding forcing you to program
                        against them in the code behind. But the key concept here is that when using the MVVM pattern you
                        should always analyze any code that you start to put in the code-behind and see if there's any way
                        to make it more declarative in the XAML itself with mechanisms like data binding, commands, or
                        behaviours to despatch calls into the ViewModel and put that logic there instead.
                    </p>
                    <h3>ViewModel Responsibilities</h3>
                    <p>
                        Finally we come to the ViewModel which is really the focal point of coding up an MVVM application.
                        The primary responsibility of a ViewModel is to provide data to the View so the View can put it on the
                        screen and, if appropriate, let the user interact with and change that data.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-010.png"/>
                        <figcaption>Fig 01-010</figcaption>
                    </figure>
                    <p>
                        The other key responsibility of a ViewModel is to encapsulate the interaction logic for a View. That
                        does not mean that all of the logic of the application should go into the ViewModel. That would just
                        create a new place where separation of concerns is being violated but what should go there is the
                        appropriate sequencing of calls to make the right thing happen based on whatever input just came
                        from the user or whatever change has occurred in the View. The ViewModel should also handle any
                        navigation logic such as deciding when it is time to navigate to a different view, and any cleanup
                        it needs to do if it's being navigated away from, and if there's any logic associated with managing
                        the client application state the ViewModel can manage those changes.
                    </p>
                    <p>In terms of the data that the ViewModel provides to the View there are really three kinds of data to
                        consider:
                    </p>
                    <ul>
                        <li>The first is exposing Model objects directly through ViewModel properties meaning something like
                            a Customer property on a ViewModel that exposes a reference to a Customer model object that
                            could be a whole object graph itself. This is called exposing the model objects
                        </li>
                        <figure>
                            <img src="./images/wpfmvvmindepth/Fig01-011.png"/>
                            <figcaption>Fig 01-011</figcaption>
                        </figure>
                        <li>ViewModel's can also expose what are called Wrapped Model objects meaning properties that are
                            exposed from the ViewModel that contain data that came from the model but are not Model object
                            references directly. This is done to either simplify the structure of the data for presentation
                            purposes or to transform model object values into something that's more conducive for what the
                            View wants to present. One example would be if a model object contained an enumerated status
                            flag. The ViewModel might transform this into a boolean flag to drive some aspect of the display
                            such as showing an alert to the customer if it's in an overdue status. Another example would be
                            that if the data needed for display was scattered in many places in the object model but you
                            wanted to present a tabular summary of those bits of data through a collection property for data
                            binding in a grid. These two approaches are called wrapping the model obejct.
                        </li>
                        <figure>
                            <img src="./images/wpfmvvmindepth/Fig01-012.png"/>
                            <figcaption>Fig 01-012</figcaption>
                        </figure>
                        <li>The last kind of data that a ViewModel will often manage is Client application state. Things
                            like - is the client application online or offline, or is the user logged in. Flags or
                            properties related to this state can be exposed by the ViewModel to drive the presentation of
                            the View and may often come from .Net APIs about the client execution context or client side
                            services that are managing that state.
                        </li>
                    </ul>
                    <h3>Client Services Responsibilities</h3>
                    <p>
                        Now there's one more layer that is not officially part of the MVVM pattern but is often used with
                        MVVM to further separate concerns and avoid duplicate code – the Client services layer.
                    </p>
                    <p>Client services encapsulate any shared logic that spans more than one ViewModel. This could be
                        utility code, data access code, security services and so on. So this layer logically sits underneath
                        the ViewModels and can allow the ViewModels to remain decoupled from things that may change over
                        time such as your data access strategy as well as any functionality that's needed in more than one
                        ViewModel.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-013.png"/>
                        <figcaption>Fig 01-013</figcaption>
                    </figure>
                    <p>A common form of client service is one that insulates the ViewModel from the specific data access
                        strategy based on the repository pattern. For example, your app might start out as a simple two-tier
                        application that talks directly to the database to get and update the data for your module but then
                        you decide to support a more distributed scenario and you need to change things so the client makes
                        web service calls to get it's data.
                    </p>
                    <figure>
                        <img src="./images/wpfmvvmindepth/Fig01-014.png"/>
                        <figcaption>Fig 01-014</figcaption>
                    </figure>
                    <p>
                        If you have the code that reads and writes the data encapsulated in a client service the ViewModel
                        and View should not have to change at all when this change is made. All the changes would be
                        encapsulated in the implementation details of the client repository. Additionally, as part of
                        reading and writing the data to whatever back-end you have, a repository can also act as a client
                        side in memory cache for data that does not change frequently on the backend such as lookup lists.
                        You can also cache transient changes made by the client that have not been persisted to the backend
                        yet even if you navigate off the current View or ViewModel that first managed those changes.
                    </p>
                    <p>So the MVVM pattern forms a layered architecture for the client side, the model objects are produced
                        by the client services layer and can be used, exposed or wrapped by the ViewModel layer. The View
                        gains access to the data exposed by the ViewModel through databinding's.
                    </p>
                    <h3>Equation of MVVM</h3>
                    <p>Another key concept to lock in your brain is what is sometimes called the Fundamental equation of
                        MVVM:
                    </p>
                    <p>View.DataContext = ViewModel</p>
                    <p>The View’s DataContext property needs to be set to a reference to the ViewModel instance for that
                        View. This allows data binding to light up and expose all the public properties of the ViewModel so
                        that any element in the View can easily data bind to them. You will also hear this referred to as
                        marrying the View and the ViewModel. There are a number of ways to satisfy the equation and I will
                        show you how to hook it up in various ways throughout the course.
                    </p>
                    <h3>Who’s on First</h3>
                    <p>
                        That last high level structural topic I want to touch on is who constructs who? You will hear the
                        terms View-First and ViewModel-First used by many when describing their approach to MVVM. What those
                        terms refer to is which object gets constructed first and does it construct the other as part of its
                        own construction or initialization process. You will typically use both of these in different parts
                        of your application so it's not a matter of choosing one over the other for everything you do but
                        it's another communication tool to be able to describe how things are hooked up for a given View and
                        ViewModel in your application.
                    </p>
                    <p>In the case of View-First, not surprisingly, the View is constructed first. This is often the case
                        for a View that is a Window or that is nested directly in a Window or parent view where the instance
                        of the View is declared as a child element in the XAML of the parent. So the XAML parsing process is
                        really what kicks of construction of the View. If you wire things up so that the ViewModel instance
                        gets constructed and set as the DataContext to the View as part of that View construction process
                        then you are doing View-First.
                    </p>
                    <p>If instead you construct an instance of the ViewModel explicitly in code somewhere and then you place
                        the ViewModel instance into a hosting context that causes construction of the View, as you'll see
                        happens with DataTemplates, then you're doing ViewModel-First construction. Some MVVM frameworks
                        also support other forms of ViewModel-First construction, such as Prism and Caliburn which we'll
                        touch on later
                    </p>
                    <h3>Summary</h3>
                    <p>
                        We've covered a lot of important concepts surrounding MVVM in this module. You've learnt that the
                        main reason that you want to use MVVM is that it will guide you in writing well structured and
                        organized code for your client application that will make it much easier to maintain.
                    </p>
                    <p>Each part of the MVVM pattern:</p>
                    <ul>
                        <li>Model</li>
                        <li>View</li>
                        <li>ViewModel</li>
                        <li>Client Services</li>
                    </ul>
                    <p>
                        has specific responsibilities that guide you in putting the right kind of code in the right place.
                        Finally, to get MVVM up and running you have to satisfy the fundamental equation of MVVM by setting
                        the Views DataContext to a reference to the ViewModel:
                    </p>
                    <figure>
                        <pre class="prettyprint"><code>View.DataContext = ViewModel;</code></pre>
                        <figcaption>Fig 01-015</figcaption>
                    </figure>
                    <p>
                        You can do this in a View-First or ViewModel-First way or by just having some code that constructs
                        both and sets the DataContext appropriately. Through the rest of this course you'll see working
                        examples of places you'll use each approach and why it's the appropriate choice for that scenario.
                    </p>
                    <p>In the next module we're going to dig in to some code and we'll show some examples of not using MVVM
                        and using MVVM for the same simple View scenario so that you can see the differences and where the
                        benefits start to come in.
                    </p>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "WPFMVVMInDepth01MVVMPatternFundamentals"
    }
</script>

<style scoped>

</style>