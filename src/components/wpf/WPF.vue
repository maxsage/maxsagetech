<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            {{pageTitle}}
        </div>
        <div class="panel-body">
            <h2>Pluralsight Courses</h2>
            <h3>Resources</h3>
            <p>
                I wanted some information on how to show Dialog boxes whilst adhering to the MVVM pattern. I managed to
                achieve this using the Prism Framework but wondered what the approach in MVVMLight Toolkit would be. The
                question had already been asked on Codeplex. I added my request for an example of this an Laurent Bugnion
                responded with an example from a recent project he had worked on.
            </p>
            <a href="https://mvvmlight.codeplex.com/discussions/658761">
                DialogService and NavigationService examples in simple WPF application - Codeplex question
            </a><br />
            <a href="https://onedrive.live.com/?authkey=%21AFL3fM4FUZ_X60w&id=FB0D8F97004979CD%211045&cid=FB0D8F97004979CD">
                DialogService and NavigationService examples in simple WPF application - Link to Downloadable Sample
            </a>
            <p>
                I have also uploaded the example to my GitHub repository:
            </p>
            <a href="https://github.com/maxsage/NavigationAndDialogWpf.git">
                NavigationAndDialogWpf on github
            </a>

            <h3>WPF Data Binding in Depth</h3>
            <a href="https://app.pluralsight.com/library/courses/wpf-data-binding-in-depth/table-of-contents"> WPF Data
                Binding in Depth On Pluralsight </a><br/>
            <router-link to="/wpf-databinding-in-depth-00-course-content" active-class="active"><a>WPF Data Binding in Depth</a></router-link>

            <p>
                Date Completed: 01/09/2016
            </p>
            <p>Rating: *****</p>
            <p>
                Review not available at this time.
            </p>

            <h3>WPF MVVM in Depth</h3>
            <a href="https://app.pluralsight.com/player?course=wpf-mvvm-in-depth&author=brian-noyes&name=wpf-mvvm-in-depth-m2&clip=0&mode=live">
                WPF MVVM In Depth On Pluralsight </a><br/>
            <!--<a [routerLink]="['WPFMVVMInDepth00CourseContents']">WPF MVVM In Depth</a><br/>-->
            <p>Date Completed: 01/08/2016</p>
            <p>Rating: *****</p>
            <p>
                This is a great course which, as the name suggests, covers the basics of the Model View ViewModel pattern in
                the context of WPF.
            </p>

            <h3>MVVM Light Toolkit Fundamentals</h3>
            <a href="https://app.pluralsight.com/library/courses/mvvm-light-toolkit-fundamentals/table-of-contents"> MVVM
                Light Toolkit Fundamentals On Pluralsight</a><br/>
            <!--<a-->
                <!--[routerLink]="['MVVMLightToolkitFundamentals00CourseContents']">MVVM Light Toolkit Fundamentals</a><br/>-->
            <p>Date Completed: ??/??/????</p>
            <p>Rating: *****</p>
            <p>
                Review not available at this time.
            </p>
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