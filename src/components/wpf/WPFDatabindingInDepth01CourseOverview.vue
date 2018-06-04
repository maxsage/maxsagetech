<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Course Overview</h2>
                </div>
                <div class="panel-body">
                    <p>
                        Hi, this is Brian Noyes, and welcome to this course on WPF Data Binding in Depth. In this course,
                        you'll get a
                        good, deep, end-to-end coverage of the data binding capabilities in WPF, enabling you to build rich,
                        data-driven business applications. You'll see how data binding can really transform the way you go
                        about
                        building out your user interface, populating it with data, and rendering out the visual elements
                        that the user
                        sees on the screen.
                    </p>
                    <p>
                        We'll start off the course with a Data Binding Overview. We'll cover the fundamentals of data
                        binding to make
                        sure everyone has a good level set, even if you have been exposed before, of what the basic building
                        blocks
                        with data binding are.
                    </p>
                    <p>
                        Now this course does not attempt to teach you everything you need to know about building XAML
                        applications. I
                        would strongly recommend you check out one of the other courses in the Pluralsight library. The
                        focus in this
                        course is just going to be on everything to do about data binding.
                    </p>
                    <p>
                        So after we go through the fundamentals, then we'll also talk about data sources, specifically what
                        kinds of
                        data objects you can use for data binding and what kinds of support those objects need to have to
                        participate
                        properly with the data binding mechanisms. We'll look at things at an entity level, we'll talk about
                        data
                        sets, XML, and Collections that you'll work with.
                    </p>
                    <p>
                        Next we'll get into the core concepts of the bindings themselves. We'll talk about how you can
                        provide
                        alternate source objects, other than the data context that we've talked about up to that point.
                        We'll talk
                        about the Path property and how that indicates what part of the data bound object to use to come up
                        with a
                        value, and we'll talk about the direction of flow of data through a binding.
                    </p>
                    <p>
                        In the next module, we'll dive to a deeper level on bindings and we'll go through a whole bunch of
                        additional
                        properties that bindings have for advanced scenarios. You probably won't use all of these on a
                        regular basis,
                        but you'll want to know they're there and how they work when the situation comes up to use them.
                        This includes
                        things like being able to do asynchronous bindings, changing when the data flows in two-way data
                        binding
                        scenarios, having fallback values and formatted values, and things like that.
                    </p>
                    <p>
                        In the fifth module, we'll go into data templates. Data templates are one of the most powerful
                        mechanisms in
                        data binding that allow you to provide a custom visual representation for the data bound objects
                        you're
                        working with, and these get rendered out by WPF itself. So we'll see how to define data templates
                        and how to
                        tie them in with your bindings.
                    </p>
                    <p>
                        Next we'll get into Design Time Data Binding, and you'll see that there's some wonderful features in
                        Visual
                        Studio for being able to drag-and-drop and generate user interface elements based on the data
                        objects that
                        you're working with, and in the process, getting the data bindings hooked up to the appropriate
                        properties on
                        those user interface elements. You'll also see how to work with Design Time data, sample data, that
                        can be
                        rendered in the Design Time environment to help you get your user interface laid out correctly.
                    </p>
                    <p>
                        In the next module, we'll drill under the covers a little bit and let you see what's going on with
                        the dynamic
                        generation of controls in containers based on data binding. We'll also review the collection
                        controls such as
                        ListBoxes, ComboBoxes, Tab Controls, and DataGrids, and cover all the important properties and usage
                        of those
                        in data bound scenarios.
                    </p>
                    <p>
                        Finally, we'll finish off the course with validation. Anytime you input data and start editing data,
                        you need
                        to make sure you're getting good data into the system. Bindings in WPF directly support evaluating
                        validation
                        and providing error indications to the user when input values are invalid. So we'll see how all that
                        works,
                        what the options are, and how to get it tied in with your bindings. So that's the game plan. Let's
                        dive right
                        in and start getting you up and running with data binding.
                    </p>
                    <figure>
                        <img src="./images/wpfdatabindingindepth/Fig00-001.png" class="image"/>
                        <figcaption>Fig00-001</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WPFDataBindingInDepth01CourseOverview"
    }
</script>

<style scoped>

</style>