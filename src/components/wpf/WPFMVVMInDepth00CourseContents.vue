<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Course Outline</h2>
        </div>
        <div class="panel-body">

          <h4>MVVM Pattern Fundamentals</h4>
          <router-link to="/wpf-mvvm-in-depth-01-mvvm-pattern-fundamentals" active-class="active"><a>MVVM Pattern
            Fundamentals</a></router-link>
          <p>
            This module starts by explaining seperation of concerns and how MVVM helps you structure your code to
            achieve this. It then moves on to briefly discuss other UI Seperation patterns such as MVP and MVC. The next
            sections cover the responsibilities of the Model, View, ViewModel and Client Services components.
          </p>
          <p>
            The final part of this model discusses the Equation of MVVM: View.DataContext = ViewModel and the order in
            which the various components get constructed.
          </p>
          <h4>First Taste of MVVM</h4>
          <router-link to="/wpf-mvvm-in-depth-02-first-taste-of-mvvm" active-class="active"><a>First Taste Of MVVM</a>
          </router-link>
          <p>Welcome back to the second module of WPF MVVM in Depth. In this module I want to give you a quick exposure
            or taste of how using MVVM changes some coding patterns for a simple input screen in WPF application that
            you may already be used to.
          </p>
          <p>I'll do this by stepping through three variants of the same simple application in demos.</p>
          <ul>
            <li>The first will have no MVVM nor data binding in it.</li>
            <li>The second will at least leverage data binding but have no MVVM.</li>
            <li>The third will evolve into showing the same view with MVVM and a quick look at some of the communication
              between View and ViewModel that we'll get into in more detail later in the course.
            </li>
          </ul>
          <h4>Hooking up Views and ViewModels in MVVM</h4>
          <router-link to="/wpf-mvvm-in-depth-03-hooking-up-views-and-viewmodels-in-mvvm" active-class="active"><a>Hooking
            up Views and ViewModels in MVVM</a></router-link>
          <p>
            In this module we will cover different ways that Views can be hooked up to ViewModels. We will also cover
            how databinding is used to expose data from your Data Models to your Views. We will start with View-First
            Construction Patterns where the View is constructed first and then takes care of constructing and hooking up
            its own ViewModel.
          </p>
          <p>Next we will cover Data Binding to make it clear how MVVM relies on data binding and uses it to flow data
            between the View and the ViewModel.
          </p>
          <p>
            Finally, we will cover ViewModel-First approach where Data Templates are used to create the View based on an
            instance of a ViewModel being placed into a data binding context.
          </p>
          <h4>View/ViewModel Communication in WPF</h4>
          <router-link to="/wpf-mvvm-in-depth-04-view-viewmodel-communication-in-wpf" active-class="active"><a>View/ViewModel
            Communication in WPF</a></router-link>
          <p>
            In this module, we will cover View/ViewModel communication in WPF. We will look at how to cleanly call logic
            that is implemented in the ViewModel when something happens in the View as well as letting the View know
            when something happens behind the scenes in your ViewModel, Model Objects or Client Services.
          </p>
          <p>
            In the second module you saw a quick example of using a Command to invoke some logic in the ViewModel. In
            this module we will look at how things get hooked up, and what happens under the covers during that hook-up.
            In addition, we will see how to use Command Enabling and Keyboard Shortcuts.
          </p>
          <p>
            Next we will look at Attached Properties and Behaviors covering what the relationship between them is, what
            their general capabilities are and how to use them in the context of MVVM as another means of setting up
            communication paths between the View elements and View Model logic or vice a versa.
          </p>
          <p>
            We will finish the module with a review of how Property Change Notifications work with Data Binding in WPF
            and show how they can be used as a signalling mechanism from the ViewModel to make things happen in the View
            at the appropriate time.
          </p>
          <h4>Applied MVVM Part 1 - Hierarchies and Navigation</h4>
          <router-link to="/wpf-mvvm-in-depth-05-applied-mvvm-part-1-hierarchies-and-navigation" active-class="active">
            <a>Applied MVVM Part 1 - Hierarchies and Navigation</a></router-link>
          <p>
            We will now start building out a few more fully functional use cases from start to finish. In doing so we
            will hit on a number of other design considerations and things you will need to know how to tackle when
            using the MVVM pattern. We will start with a few concepts first including:
          </p>
          <ul>
            <li>Naming and Location of Components</li>
            <li>Hierarchical MVVM/Navigation</li>
            <li>MVVM App Building</li>
          </ul>
          <h4>Applied MVVM Part 2 - Validation and Dependency Injection</h4>
          <router-link to="/wpf-mvvm-in-depth-06-applied-mvvm-part-2-validation-and-dependency-injection"
                       active-class="active"><a>Applied MVVM Part 2 - Validation and Dependency Injection</a>
          </router-link>
          <p>
            In this final module we continue to build out use cases surrounding Customers in our Pizza Order Management
            Application. This will include fleshing out some data entry for adding and editing Customers by leveraging
            the Scaffolding of data-centric Views that is available in Visual Studio. We also look at validation in the
            context of MVVM.
          </p>
          <p>
            When ViewModels take dependencies on client services you will want to make sure those dependencies are
            loosely coupled. We will cover dependency injection.
          </p>
          <p>Finally, we will cover some of the toolkits and frameworks that can assist when writing applications that
            adhere to the MVVM pattern.
          </p>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WPFMVVMInDepth00CourseContents'
}
</script>

<style scoped>

</style>
