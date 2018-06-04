<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Course Contents</h2>
                </div>
                <div class="panel-body">
                    <h4>Course Overview</h4>
                    <router-link to="/wpf-databinding-in-depth-01-course-overview" active-class="active"><a>Course Overview</a></router-link>
                    <p>
                        Data binding is one of the most powerful and important capabilities in WPF applications for building
                        data-driven, loosely coupled, maintainable applications. In this course you will learn how to use the
                        end-to-end capabilities of data binding in WPF including both the most common features as well as more
                        advanced capabilities.
                    </p>
                    <h4>Data Binding Overview</h4>
                    <router-link to="/wpf-databinding-in-depth-02-databinding-overview" active-class="active"><a>Data Binding Overview</a></router-link>
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
                    <h4>Data Sources</h4>
                    <router-link to="/wpf-databinding-in-depth-03-data-sources" active-class="active"><a>Data Sources</a></router-link>
                    <p>
                        Hi, this is Brian Noyes, and in this module we're going to focus on data sources for data binding, where the
                        data comes from to support your UI. Specifically, we're going to talk about the different kinds of data source
                        objects that you can data bind to and some of the support those data objects may need to fully participate in
                        data binding.
                    </p>
                    <p>
                        First we're going to talk about Entity Data Sources, and this includes individual objects that you want to
                        data bind to and their properties for something like a data entry form, as well as collections of entities for
                        something like a DataGrid or a ComboBox. Next we're going to talk about Change Notifications. This is support
                        that these entities will need in order to fully participate in data binding, meaning that if their properties
                        can change behind the scenes, they've got to raise Change Notifications so that the binding can update the UI
                        and keep it fresh with the real state of the data behind the scenes.
                    </p>
                    <p>
                        Next we're going to talk about some of the other aspects of the support that entities can have for data
                        binding, inluding the ability to back out changes when multiple properties have been changed. Those are called
                        EditableObjects, and CollectionViews, which are things that wrap collections when you data bind to them to
                        maintain the notion of currency or what is the current object within the collection. Towards the end of the
                        module, we'll start talking about other kinds of things besides entities including DataSets and XML Data
                        Sources, and how you can go about data binding to those.
                    </p>
                    <h4>Binding Core Concepts</h4>
                    <router-link to="/wpf-databinding-in-depth-04-binding-concepts" active-class="active"><a>Binding Concepts</a></router-link>
                    <p>
                        Hi, this is Brian Noyes. In this module, we're going to dive a little deeper into bindings and get into some
                        of the core concepts of how you can have explicit control over exactly what a binding is doing with respect to
                        its source objects and its paths and the direction of flow of data through that binding.
                    </p>
                    <p>
                        First we're going to dive into binding sources. We've already seen in previous modules how bindings use the
                        DataContext as their source by default. In this section we'll talk about the other options that you have
                        there, including the RelativeSource bindings, ElementName bindings, and Source bindings where you can point to
                        a explicit Source object through those properties on the binding.
                    </p>
                    <p>
                        Next we're going to get into Property Paths in a little more detail. We've seen simple paths that are just a
                        property name in previous demos, and we've actually seen a couple of other examples that dot down. Here we'll
                        just talk a little bit more about exactly what is supported, the fact that you can walk an entire object graph
                        through the property path and even index into arrays
                    </p>
                    <p>
                        And also we'll talk a little bit about debugging bindings when they're not working and see how you can spot
                        the errors for your bindings in the output window.
                    </p>
                    <p>
                        Finally, we'll close out this module with the mode and direction of bindings. Bindings flow from source to
                        target, by default, and we've seen that you can have two-way bindings that flow from target to source as well.
                        The binding mode property is the thing that lets you control this, and we'll also look into how the default
                        direction is set for a given target property through its DependencyProperty metadata.
                    </p>
                    <h4>Unleashing the Full Power of Bindings</h4>
                    <router-link to="/wpf-databinding-in-depth-05-unleashing-the-full-power-of-bindings" active-class="active"><a>Unleashing The Full Power Of Bindings</a></router-link>
                    <p>
                        Hi, this is Brian Noyes, and in this module we're going to dive deeper into bindings and look at a number of
                        additional properties that let you unleash the full power of what a binding can do for you for specialized
                        scenarios.
                    </p>
                    <p>
                        First up, we're going to look at a property called UpdateSourceTrigger, and this is a property on a binding
                        that controls when data flows from the target to the source into a data binding scenario. The Default mode is
                        when focus changes, but you'll see there's a number of other options there and I'll explain how that works.
                    </p>
                    <p>
                        Next we're going to talk about Converters. Convertors give you a lot of power because it allows you to insert
                        an object between the source and the target object conceptually, hooked up through the binding, and the data
                        will flow through that Converter. So as the data flows from the source to the target, you can change the value
                        or the type of the object that's being used to set the target property. And, likewise, in a two-way data
                        binding scenario, as data flows from the target to the source, you can do a similar transformation either in
                        value or in type.
                    </p>
                    <p>
                        Next we'll talk about Async Bindings. Normally, bindings all happen on the UI thread, but sometimes you may
                        need to have the get and set block of your source property called on a background thread, and Async bindings
                        allow you to do that.
                    </p>
                    <p>
                        Then we'll talk about Fallback values and this is really two separate properties on a binding, one called
                        FallbackValue and one called TargetNullValue, that allow you to provide alternate values to be used when the
                        source object can't be resolved properly.
                    </p>
                    <p>
                        Next we'll talk about FormatString. This is an automatic convertor of sorts, that lets you convert from the
                        source property into a formatted string using any standard .NET FormatString to render out the value the way
                        you want to present it to the user.
                    </p>
                    <p>
                        Finally, we'll finish off with a couple of specialized bindings called a MultiBinding and a PriorityBinding.
                        These bindings allow you to aggregate multiple bindings into a collection, and in the case of the
                        MultiBinding, you can come up with a single value based on the individual values of those multiple bindings.
                        And in the case of the PriorityBinding you can pick from one of the child bindings which one to use based on a
                        priority scheme. So let's dive right in and see how these modify the behavior of our bindings.
                    </p>
                    <h4>Deep Dive into DataTemplates</h4>
                    <router-link to="/wpf-databinding-in-depth-06-deep-dive-into-data-templates" active-class="active"><a>Deep Dive Into Data Templates</a></router-link>
                    <p>
                        Hi, this is Brian Noyes, and in this module we're going to dive into Data Templates. Data Templates are a very
                        powerful mechanism of WPF data binding that allows you to provide the visual structure for some data-bound
                        object and have that mapped up at runtime as the objects get rendered out. So we'll look at how DataTemplates
                        work and what the variations on DataTemplates are and how to use them.
                    </p>
                    <p>
                        First we'll talk about the broad concepts of DataTemplates and how they work in general, and how they get
                        mapped out to the data objects that are being rendered out to provide the visual structure for rendering on
                        the screen.
                    </p>
                    <p>
                        Next we'll talk about ExplicitDataTemplates, which are the most direct and simple way to use DataTemplates. As
                        the name implies, it involves a direct hookup between the data-bound control and the template that should be
                        used for a given collection or data object.
                    </p>
                    <p>
                        Next we'll talk about ImplicitDataTemplates, which are a little more magical in the way that they work, but it
                        involves an automatic selection of the appropriate DataTemplate based on the type of the data object that's
                        going to be rendered, and this gives us an awful lot of power for handling heterogeneous collections of
                        derived types of some data object type, and it becomes vitally important in Model-View-ViewModel scenarios,
                        which we'll use in the demos to render out different Views for different ViewModel types.
                    </p>
                    <p>
                        Next, we'll talk about DataTemplateSelectors, which give you a little more explicit control, but still dynamic
                        control to switch which DataTemplate you use based on whatever logic you need to invoke to make that
                        selection. And finally, we'll finish off this module with HierarchicalDataTemplates, which are just a
                        specialized form of DataTemplate that work in hierarchical data model scenarios such as presenting data in
                        TreeView control.
                    </p>
                    <h4>Design Time Data Binding</h4>
                    <router-link to="/wpf-databinding-in-depth-07-design-time-data-binding" active-class="active"><a>Design Time Data Binding</a></router-link>
                    <p>
                        Hi, this is Brian Noyes. In this module, we're going to look into some of the Design Time Data features that
                        Visual Studio has to help you get your UI's hooked up, data-bound, and even generate UI elements based on your
                        data model.
                    </p>
                    <p>
                        We'll also look at how you can use sample data in the Design-Time environment to help get your UI laid out and
                        to have that data to visualize what it's going to look like in the UI as you're designing it.
                    </p>
                    <p>
                        First, we're going to look at two windows within the Visual Studio environment, the Data Sources Window and
                        the Properties Window.
                    </p>
                    <p>
                        Data Sources Window lets you generate data-bound UI elements based on your data model or hook up existing
                        elements, and the Properties Window lets you hook up bindings to individual properties for the elements you're
                        working with in the designer.
                    </p>
                    <p>
                        Next, we're going to look at working with DataTemplates in the designer. Visual Studio carries over some
                        features from Blend where you can actually design DataTemplates in the designer as a stand-alone resource, and
                        then switch back into the main design mode of the designer when you're done.
                    </p>
                    <p>
                        Finally, we'll look at how you can use the overall feature that's referred to as Design Time Data, which is
                        mainly a set of properties and markup extensions that you can use within your XAML that makes certain things
                        available to the designer, but they go away at runtime. And this includes being able to pull in some sample
                        data that will populate your UI in the designer, but not be there at runtime.
                    </p>
                    <h4>Containers and Collection Controls</h4>
                    <router-link to="/wpf-databinding-in-depth-08-containers-and-collection-controls" active-class="active"><a>Containers and Collection Controls</a></router-link>
                    <p>
                        Hi, this is Brian Noyes. In this module, we're going to dive into some of the containment scenarios and the
                        dynamic generation of contained controls based on data binding.
                    </p>
                    <p>
                        We'll also look in more depth at the common collection controls, including ListBox, ComboBox, TabControl and
                        DataGrid. And we'll finish off by talking a little bit more about collection views, which can be used to
                        modify the collections you're data-bound to.
                    </p>
                    <p>
                        So first up, we're going to dive into what's really going on at runtime when you have a data-driven control
                        and the composition that happens with the UI elements that are generated based on the data. I'll quickly
                        explain what's going on in concept with bullets, and then we'll dive into a demo that hopefully makes it all
                        clear, since it is dynamic in nature.
                    </p>
                    <p>
                        Next, we'll review ComboBoxes and ListBoxes and the key data binding properties and behaviors there. We've
                        seen a lot of this in previous demos, but in those previous demos I just kind of glanced over it and didn't
                        focus one at a time on the properties you'll care about.
                    </p>
                    <p>
                        Next, we'll get into TabControls, which TabControls are more of a structural element, but they can be
                        data-driven themselves. So we'll see a common scenario where you can use TabControls for child view
                        containment that can be dynamically-driven through data binding.
                    </p>
                    <p>
                        Next, we'll get into the Ubiquitous DataGrid and we'll focus on some of the key properties that you'll need to
                        know to really drive a DataGrid in normal data binding scenarios. There are, naturally, all kinds of deep,
                        dark corners in the DataGrid and lots of fancy customizations of appearance and things that are out of scope
                        for this course. What I'm going to focus on are the things that really drive the behavior of the DataGrid,
                        based on it being data-bound.
                    </p>
                    <p>
                        Finally, we'll finish out this module by revisiting Collection Views. I talked about the ICollectionView
                        interface in an earlier module, and we looked at the notion of currency driven by Collection Views. Here we're
                        going to focus on some other things it can do for you in terms of manipulating the collection that you're
                        working with to do things like sorting, filtering, grouping, and master-details presentations.
                    </p>
                    <h4>Data Input Validation</h4>
                    <router-link to="/wpf-databinding-in-depth-09-data-input-validation" active-class="active"><a>Data Input Validation</a></router-link>
                    <p>
                        Hi, this is Brian Noyes. In this last module, we're going to look into the validation mechanisms of data
                        bindings and how you can use it to provide validation indications to a user when they put in bad data.
                    </p>
                    <p>
                        First we're going to talk about the simplest mechanism to use, which is to throw an exception when you get bad
                        data and to turn on a flag on the binding to have it give validation indications based on that.
                    </p>
                    <p>
                        After that, we'll look at a built-in mechanism in WPF called ValidationRules. ValidationRules are objects that
                        you implement that encapsulate a rule and get evaluated by a binding when you hook it up to it. If that rule
                        returns an error, then you'll get an error indication on the screen.
                    </p>
                    <p>
                        Next, we'll look at an interface that's been around since .NET 1.0 called IDataErrorInfo, which is a standard
                        mechanism for indicating validation errors in combination with data binding. When you use IDataErrorInfo, the
                        object that you're binding to implements this interface and it will be queried for errors after the properties
                        are set.
                    </p>
                    <p>
                        Next, we'll look at INotifyDataErrorInfo, which was added in .NET 4.5 and supports asynchronous validation.
                        It's very similar to IDataErrorInfo, which is a synchronous API, but it supports the notion that you may need
                        to make an asynchronous call to something like a service to determine whether an input value is valid or not,
                        and then once you get the results back, then you want to provide the invalid indication.
                    </p>
                    <p>
                        Next, we'll talk briefly about some binding events that are available that can be handy in dealing with
                        validation and other scenarios as well. We'll talk about how you can customize the validation indications that
                        the built-in controls use for presenting validation errors and how you can provide things like ToolTips with
                        the error strings in them.
                    </p>
                    <p>
                        And then we'll finish off this module by talking about DataAnnotations, which are a standard mechanism in .NET
                        for indicating the validation rules associated with the property through attributes.
                    </p>
                    <h4>Course Wrap Up</h4>
                    <p>
                        So that completes our course on WPF data binding in depth. You got a good end-to-end coverage of all the
                        capabilities of WPF data binding, starting with the data binding Overview, where we covered the basics of
                        bindings and DataContext, and so on.
                    </p>
                    <p>
                        We got into Data Sources and what kinds of objects you can work with, what types of interfaces and support
                        those objects need, as well as what types of collections you want to work with for data binding. We got into
                        the Binding Core Concepts, talking about things like alternate ways of expressing what the source object is,
                        what the path on that source object is, and what the direction of flow of data with the Mode property is.
                    </p>
                    <p>
                        We got into the more advanced properties of data bindings and talked about things like doing Async bindings
                        and the UpdateSourceTrigger property to trigger when data flows, and using FallbackValues and StringFormats,
                        and so on.
                    </p>
                    <p>
                        We covered DataTemplates in depth, and you saw that those really start to unleash the power of data binding to
                        allow you to have custom rendering of your data-bound objects in any kind of container control that's going to
                        do data binding.
                    </p>
                    <p>
                        We looked at the Design Time features in Visual Studio and a little bit in Blend, that help you get really
                        productive with data binding, dragging and dropping your way to a data-bound UI and generating the UI elements
                        and getting them a decent layout to start with.
                    </p>
                    <p>
                        We dove under the covers a little bit and showed you what's really going on when data binding occurs in
                        building up the visual tree based on the data-bound objects.
                    </p>
                    <p>
                        And we reviewed the common collection controls and made sure you really knew how to use all the properties
                        associated with data bindings for things like ComboBoxes, ListBoxes, TabControls, and DataGrids, as well as
                        CollectionViewSources.
                    </p>
                    <p>
                        And finally, we finished off in this module with Validation.
                    </p>
                    <p>So that pretty much wraps it up. Thank you very much for viewing the course. Please recommend it to your
                        friends. Be sure to come back and watch parts again if you need to review concepts and review the code, and
                        hopefully at this point you feel very well-equipped to go start hooking up your complex data-bound UIs for
                        your business applications.
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "wpf"
    }
</script>

<style scoped>

</style>