<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Data Input Validation</h2>
        </div>
        <div class="panel-body">
          <h3>Introduction</h3>
          <p>Hi, this is Brian Noyes. In this last module, we're going to look into the validation mechanisms of data
            bindings and how you can use it to provide validation indications to a user when they put in bad data.
          </p>
          <p>First we're going to talk about the simplest mechanism to use, which is to throw an exception when you get
            bad data and to turn on a flag on the binding to have it give validation indications based on that.
          </p>
          <p>After that, we'll look at a built-in mechanism in WPF called ValidationRules. ValidationRules are objects
            that you implement that encapsulate a rule and get evaluated by a binding when you hook it up to it.
          </p>
          <p>If that rule returns an error, then you'll get an error indication on the screen. Next, we'll look at an
            interface that's been around since .NET 1.0 called IDataErrorInfo, which is a standard mechanism for
            indicating validation errors in combination with data binding. When you use IDataErrorInfo, the object that
            you're binding to implements this interface and it will be queried for errors after the properties are set.
          </p>
          <p>Next, we'll look at INotifyDataErrorInfo, which was added in .NET 4.5 and supports asynchronous validation.
            It's very similar to IDataErrorInfo, which is a synchronous API, but it supports the notion that you may
            need to make an asynchronous call to something like a service to determine whether an input value is valid
            or not, and then once you get the results back, then you want to provide the invalid indication.
          </p>
          <p>Next, we'll talk briefly about some binding events that are available that can be handy in dealing with
            validation and other scenarios as well. We'll talk about how you can customize the validation indications
            that the built-in controls use for presenting validation errors and how you can provide things like ToolTips
            with the error strings in them.
          </p>
          <p>And then we'll finish off this module by talking about DataAnnotations, which are a standard mechanism in
            .NET for indicating the validation rules associated with the property through attributes.
          </p>
        </div>
        <div class="panel-body">
          <h3>Validating on Exceptions</h3>
          <p>One of the simplest ways to do validation with bindings is to use exceptions. Normally when you hook up a
            binding to a property, if that property get or set block throws an exception, the binding is just going to
            swallow it.
          </p>
          <p>It catches the exception. If you watch your output window, you'll see it as a first chance exception,
            meaning it was handled, and it's handled inside of the binding itself. But if you're explicitly throwing
            exceptions to indicate that a value that's being set is invalid, you want to use that for validation
            purposes.
          </p>
          <p>All you do to do this is set a property on the binding that says ValidatesOnExceptions=True. Once you do
            that, the binding catch block that catches the exception, will take the error message of the exception and
            use that as a validation error.
          </p>
          <p>One of the other advantages of this mechanism, besides its simplicity, is that it allows you to reject
            invalid values before you ever store them, in the property itself.
          </p>
          <p>So you can basically check your logic for what the validation rule is in the set block, throw the
            exception, and don't store the value in the member variable if it's an invalid value. So let's take a look
            at a demo of how this works in code.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Validating on Exceptions</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-001" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-001"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-002" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-002"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <p>In this demo, we're going to get started with validation by showing you the easiest form of validation to
            use, and that's using exceptions. The starting point for this demo and the rest of the demos in this module,
            is a simple WPF project.
          </p>
          <p>It's got an empty MainWindow at this point. The only thing in the MainWindow is a CollectionViewSource:</p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
&lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
        d:DesignSource=&quot;{d:DesignInstance {x:Type local:Customer}, CreateList=True}&quot; /&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 07-190</figcaption>
          </figure>
          <p>that's going to be working with a Customer Type. In the code-behind of the MainWindow, we've got the Window
            Loaded event hooked up to go ahead and access that customerViewSource and just put an empty Customer object
            into that collection.
          </p>
          <figure>
                <pre class="prettyprint">private void Window_Loaded(object sender, RoutedEventArgs e)
{

    CollectionViewSource customerViewSource = ((CollectionViewSource)(this.FindResource("customerViewSource")));
    customerViewSource.Source = new Customer[] { new Customer() };
}</pre>
            <figcaption>Fig 07-191</figcaption>
          </figure>
          <p>And the Customer object we'll be dealing with in this demo is just a simple form of Customer.</p>
          <figure>
                <pre class="prettyprint">public class Customer : INotifyPropertyChanged
{
    private string _HomePhone;
    public string HomePhone
    {
        get { return _HomePhone; }
        set
        {
            if (_HomePhone != value)
            {
                _HomePhone = value;
                PropertyChanged(this, new PropertyChangedEventArgs(&quot;HomePhone&quot;));
            }
        }
    }</pre>
            <figcaption>Fig 07-192</figcaption>
          </figure>
          <p>It's got three properties at this point, it's got a HomePhone, a WorkPhone, and a CellPhone, and you can
            see it's just implementing the INotifyPropertyChanged on that Entity Type.
          </p>
          <p>So that's our starting point. Let's go ahead and add a couple of fields to our MainWindow to start doing
            some validation. So I'm going to drag out the Work Phone and Home Phone fields to generate two input fields,
            and we won't worry about layout here.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-193.png" class="image"/>
            <figcaption>Fig 07-193</figcaption>
          </figure>
          <p>Now if you remember from the Data Sources Window demos in a previous module, when we do that drag/drop,
            because we already have this CollectionViewSource here:
          </p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
                          d:DesignSource=&quot;{d:DesignInstance {x:Type local:Customer}, CreateList=True}&quot; /&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 07-194</figcaption>
          </figure>
          <p>it didn't generate a new one, it just set the DataContext on the two Grids that it generated, you can see
            one grid for one field
          </p>
          <figure>
                <pre class="prettyprint">&lt;Grid x:Name=&quot;grid1&quot;
        DataContext=&quot;{StaticResource customerViewSource}&quot;&gt;
        HorizontalAlignment=&quot;Left&quot;</pre>
            <figcaption>Fig 07-195</figcaption>
          </figure>
          <p>one grid for the other field.</p>
          <figure>
                <pre class="prettyprint">&lt;Grid x:Name=&quot;grid1&quot; ...&gt;
    &lt;Grid x:Name=&quot;grid2&quot;
DataContext=&quot;{StaticResource customerViewSource}&quot;
HorizontalAlignment=&quot;Left&quot;</pre>
            <figcaption>Fig 07-196</figcaption>
          </figure>
          <p>It sets the DataContext on the grid to the customerViewSource, and then on the data input field it added
            the binding to the appropriate field.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;homePhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding HomePhone, Mode=TwoWay, NotifyOnValidationError=true,  ValidatesOnExceptions=true, UpdateSourceTrigger=PropertyChanged}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot; /&gt;</pre>
            <figcaption>Fig 07-197</figcaption>
          </figure>
          <p>Now as we talked about before, when you do these drag-and-drops it adds some of these other properties
            relative to validation. You can see, by default, it's going to turn on ValidatesOnExceptions=true.
          </p>
          <figure>
            <pre class="prettyprint">Binding HomePhone, Mode=TwoWay, NotifyOnValidationError=true,  ValidatesOnExceptions=true</pre>
            <figcaption>Fig 07-198</figcaption>
          </figure>
          <p>The NotifyOnValidationError we'll get to later in the module. I'll take that off for now, as well as the
            Mode=TwoWay, which we covered in the previous module, is not needed on input controls in WPF.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;homePhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding HomePhone, ValidatesOnExceptions=true }&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;
/&gt;</pre>
            <figcaption>Fig 07-199</figcaption>
          </figure>
          <p>So we're going to focus on this Home Phone field for now. In fact, I'm going to take the
            ValidatesOnExceptions off for now, so I can first show what the default behavior of bindings is when there
            are exceptions.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;homePhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding HomePhone }&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;
/&gt;</pre>
            <figcaption>Fig 07-200</figcaption>
          </figure>
          <p>So let's drop back to the customer here and add a little Helper method to validate a phone number.</p>
          <figure>
                <pre class="prettyprint">private void ValidatePhone(string value)
{
    if (string.IsNullOrEmpty(value))
        return;
    Regex regex = new Regex(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;);
    if (regex.Match(value) == Match.Empty)
        throw new ArgumentException(&quot;Invalid phone format&quot;);
}</pre>
            <figcaption>Fig 07-201</figcaption>
          </figure>
          <p>This method's going to take in a value and it's going to use a RegularExpression, which you don't have to
            read through the RegularExpression, but it's looking for a standard 3 digits, 3 digits, 4 digits kind of
            format, like a U.S. phone number.
          </p>
          <p>And if it doesn't match, it's going to throw an exception, an argument exception in this case, with an
            error string of Invalid phone format.
          </p>

          <p>So now all we need to do is go to our HomePhone property, and after we see if the value coming in is
            different from the one we currently have, we can invoke our ValidatePhone method, passing in the value.
          </p>
          <figure>
                <pre class="prettyprint">private string _HomePhone;
public string HomePhone
{
    get { return _HomePhone; }
    set
    {
        if (_HomePhone != value)
        {
            ValidatePhone(value);
            _HomePhone = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;HomePhone&quot;));
        }
    }
}</pre>
            <figcaption>Fig 07-202</figcaption>
          </figure>
          <p>So one of the advantages of using exceptions for validation is that you can prevent the value from ever
            getting stored in your Entity object if it's not a valid value.
          </p>
          <p>So if we run this right now, and I've got the output window up at the bottom, note that as I put in an
            invalid phone number, something like abc, and tab out of the field, you can see some first chance exceptions
            happening at the bottom.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-203.png" class="image"/>
            <figcaption>Fig 07-203</figcaption>
          </figure>
          <p>That's because, by default, a binding will swallow any exceptions raised when it calls the set and get
            block, and it prevents your application from blowing up if it can't evaluate the property that it's pointed
            to.
          </p>
          <p>But in this case, we want that exception to indicate that there's a validation error. So I'm going to go
            back to my binding and put back on ValidatesOnExceptions=True:
          </p>
          <figure>
                <pre class="prettyprint">Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding HomePhone, ValidatesOnExceptions=True }&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;
/&gt;</pre>
            <figcaption>Fig 07-204</figcaption>
          </figure>
          <p>Now if we run the same scenario, we go ahead and put in an invalid value and tab out of the field, now we
            can see there's a red box around the control.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-205.png" class="image"/>
            <figcaption>Fig 07-205</figcaption>
          </figure>
          <p>So WPF controls, by default, have a built-in error template that simply puts a red box around the control.
            Now that's generally not enough information for the user, because they don't know exactly what's wrong with
            that error and you probably want to tell them what the error message was associated with the validation
            error.
          </p>
          <p>We'll get to how you can display those things later in this module, but for now you can see that it has
            gone into an invalid state and it will remain in that state until we put a valid value in, such as this
            number, and tab out of the field, and the red box goes away.
          </p>
          <p>So validating based on exceptions requires nothing more than in the set block of the property that's going
            to be set, invoke some logic that goes and decides whether the value is valid and throws an appropriate
            exception if not.
          </p>
        </div>
        <div class="panel-body">
          <h3>Validating with WPF ValidationRules</h3>
          <p>Another option you have in WPF for defining ValidationRules, getting them evaluated and hooked up to a
            binding, is to use the built-in WPF concept of a ValidationRule. These ValidationRules are specific to WPF,
            they did not get carried over to Silverlight, or Windows Phone or Windows 8 XAML technologies.
          </p>
          <p>What you do is define a class that inherits from a ValidationRule base class, and then you override a
            Validate method that's an abstract method in the base class. That Validate method returns a ValidationResult
            object, which includes a flag to indicate success or failure, a Boolean, and an error message that can be
            associated with it.
          </p>
          <p>Once you have the ValidationRule defined, you go and you hook it up to a ValidationRules collection that's
            on a binding. To do this, you have to use an expanded syntax that we'll see in the demo for a binding,
            instead of using a normal curly brace markup extension.
          </p>
          <p>The good thing about ValidationRules is they can be used to encapsulate reusable rules, which you can then
            go plug in to different places in your UI fairly easily. But, of course, the downside is the portability,
            and you'll see another downside is that they're not very good for context-specific rules.
          </p>
          <p>For general purpose rules they're okay, but the rule doesn't get passed enough context about where it's
            hooked up to really be able to modify its logic based on the context of where it's being used.
          </p>
          <p>So let's take a look at a demo of how you define ValidationRules and get them hooked up to your bindings.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Validating with WPF ValidationRules</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-003" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-003"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-004" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-004"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>In this demo, I'm going to get you familiar with ValidationRules in WPF, which are objects you can create
            to encapsulate a rule and attach to a binding as a different way of setting up your validation.
          </p>
          <p>Starting point for this demo is the end of the last one.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-206.png" class="image"/>
            <figcaption>Fig 07-206</figcaption>
          </figure>
          <p>We have our work and home phone inputs. The Home Phone is still hooked up with an exception ValidationRule.
            We're going to hook up a WPF ValidationRule to the Work Phone.
          </p>
          <p>To do that, we first have to define the rule. So I'm going to add a class and call this
            RegexValidationRule:
          </p>
          <figure>
                <pre class="prettyprint">public class RegexValidationRule : ValidationRule
{
    public override ValidationResult Validate(object value, CultureInfo cultureInfo)
    {
        Regex m_RegEx = new Regex(@"^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"));
        Match match = m_RegEx.Match(value.ToString());
        if (match == null || match == Match.Empty)
            return new ValidationResult(false, &quot;Invalid input format&quot;);
        else
            return ValidationResult.ValidResult;
    }
}</pre>
            <figcaption>Fig 07-207</figcaption>
          </figure>
          <p>And basically what you do here is you derive from the ValidationRule base class of WPF.</p>
          <p>That has an abstract method called Validate that you must override, and you're expected to return a
            ValidationResult that indicates success or failure, and if it's failure it includes an error string.
          </p>
          <p>The Validate method is going to be passed in a value, the value that's being set on some binding that this
            ValidationRules is going to get attached to, and basically, inside of your Validate method you have to come
            up with an answer of whether the value is valid or not, so there's some implied context here.
          </p>
          <p>In this case, we're writing a reusable ValidationRule based on RegularExpressions. Now as a starting point
            here I've got the RegularExpression hard-coded into this rule. So really this should be a
            PhoneValidationRule not a RegexValidationRule because we can't easily modify that.We'll fix that in a bit.
          </p>
          <p>But you can see I'm just setting up a Regex, evaluating it with a Match call, and if it doesn't match that
            RegularExpression, we return a validationResult with a false indication, so it's not valid, and an error
            string associated with that. If it does match, then we just return ValidationResult.ValidResult.
          </p>
          <p>Now let's go back over to our MainWindow to our Work Phone TextBox.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-208.png" class="image"/>
            <figcaption>Fig 07-208</figcaption>
          </figure>
          <p>So here's the WorkPhone Binding that was put in there through drag-and-drop:</p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;workPhoneTextBox&quot;
        Grid.Column=&quot;1&quot;
        HorizontalAlignment=&quot;Left&quot;
        Height=&quot;23&quot;
        Margin=&quot;3&quot;
        Grid.Row=&quot;0&quot;
        Text=&quot;{Binding WorkPhone}&quot;
        VerticalAlignment=&quot;Center&quot;
        Width=&quot;120&quot; /&gt;</pre>
            <figcaption>Fig 07-209</figcaption>
          </figure>
          <p>I'm going to remove the rest of the properties on the binding. Now the first thing to realize is that
            there's a different way to set a binding other than the curly brace notation of markup extensions. Anything
            that can be set as a markup extension like this, can also be set as a nested element in XAML.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;workPhoneTextBox&quot;
        Grid.Column=&quot;1&quot;
        HorizontalAlignment=&quot;Left&quot;
        Height=&quot;23&quot;
        Margin=&quot;3&quot;
        Grid.Row=&quot;0&quot;
        VerticalAlignment=&quot;Center&quot;
        Width=&quot;120&quot; /&gt;
    &lt;TextBox.Text&gt;
        &lt;Binding Path=&quot;WorkPhone&quot; /&gt;
    &lt;/TextBox.Text&gt;
</pre>
            <figcaption>Fig 07-210</figcaption>
          </figure>
          <p>So I can take out the Text property here and add it in like this, where I'm setting the text property as a
            nested element on my TextBox and the value of that property is inside of the angle brackets, in this case an
            instance of a binding with its path set to WorkPhone.
          </p>
          <p>So that's just the equivalent syntax there for setting up the binding. Now the reason for this is when you
            use ValidationRules you have to set a property on the binding that cannot be done inline as a markup
            extension.
          </p>
          <p>So then we can expand the binding to allow child elements and add in ValidationRules:</p>
          <figure>
                <pre class="prettyprint">&lt;TextBox.Text&gt;
    &lt;Binding Path=&quot;WorkPhone&quot;&gt;
        &lt;Binding.ValidationRules&gt;
            &lt;local:RegexValidationRule  /&gt;
        &lt;/Binding.ValidationRules&gt;
    &lt;/Binding&gt;
&lt;/TextBox.Text&gt;</pre>
            <figcaption>Fig 07-211</figcaption>
          </figure>
          <p>So there's a ValidationRules collection on a binding. Inside of that you can add instances of
            ValidationRules, so we add an instance of our RegexValidationRule inside that collection. And now, anytime
            that binding goes to set the WorkPhone path, it's going to evaluate that ValidationRule and pass in the
            value that it was going to use.
          </p>
          <p>So with that in place, we could go ahead and run, and we can put the WorkPhone into an invalid state, and
            tab out of the field, and we can see it goes red:
          </p>
          CFig
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-212.png" class="image"/>
            <figcaption>Fig 07-212</figcaption>
          </figure>
          <p>Get it back into a valid state, tab out, and the red box goes away.</p>
          <p>Now another thing to point out here while I'm at this point is the UpdateSourceTrigger property of a
            binding. So this is the same UpdateSourceTrigger that we've seen inside the curly brace notation:
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox.Text&gt;
    &lt;Binding Path=&quot;WorkPhone&quot; UpdateSourceTrigger="PropertyChanged"&gt;
        &lt;Binding.ValidationRules&gt;
            &lt;local:RegexValidationRule  /&gt;
        &lt;/Binding.ValidationRules&gt;
    &lt;/Binding&gt;
&lt;/TextBox.Text&gt;</pre>
            <figcaption>Fig 07-213</figcaption>
          </figure>
          <p>If we set it to PropertyChanged instead of the default of LostFocus, then we get more immediate feedback to
            the user of validation errors. So as soon as I go into an invalid state, the red box appears, and as soon as
            I'm back in a valid state the red box goes away. So UpdateSourceTrigger, if you want immediate feedback to
            the user as they're typing, of whether their current input is valid or not, can be a good combination when
            doing validation.
          </p>
          <p>In general, one of the problems with ValidationRules is the fact that there's very little context available
            inside of the Rule itself about what you're evaluating and where it's coming from. All you get is a value
            here.
          </p>
          <figure>
            <pre class="prettyprint">public override ValidationResult Validate(object value, CultureInfo cultureInfo)</pre>
            <figcaption>Fig 07-214</figcaption>
          </figure>
          <p>You can think of this as, if a stranger walks up to you on the street, says 42, are you okay with that. You
            have no context for why they're asking, where the 42 comes from, what it relates to, all you have is a value
            and you're supposed to come up with an answer of is that valid or not, and if not, an error string of why
            not. So you really need to be able to pass some more context down into your ValidationRules to make them
            more meaningful.
          </p>
          <p>So one thing you can do is define properties on your ValidationRules.</p>
          <p>I'm going to expand my implementation here and add down at the bottom here an Expression property.</p>
          <figure>
                <pre class="prettyprint">public class RegexValidationRule : ValidationRule
{
    public override ValidationResult Validate(object value, CultureInfo cultureInfo)
    {
        if (Expression == null)
            return ValidationResult.ValidResult;

        Regex m_RegEx = new Regex(Expression);
        Match match = m_RegEx.Match(value.ToString());
        if (match == null || match == Match.Empty)
            return new ValidationResult(false, &quot;Invalid input format&quot;);
        else
            return ValidationResult.ValidResult;
    }</pre>
            <figcaption>Fig 07-215</figcaption>
          </figure>
          <p>Now I can pass in the RegularExpression, making this rule really more reusable.</p>
          <p>So we got rid of the hard-coded RegularExpression, and now we use the Expression property to formulate our
            Regex and evaluate it. Now we can go back out to our XAML and set it when we go to use our RegularExpression
            rule.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox.Text&gt;
    &lt;Binding Path=&quot;WorkPhone&quot; UpdateSourceTrigger="PropertyChanged"&gt;
        &lt;Binding.ValidationRules&gt;
            &lt;local:RegexValidationRule  /&gt;
        &lt;/Binding.ValidationRules&gt;
    &lt;/Binding&gt;
&lt;/TextBox.Text&gt;</pre>
            <figcaption>Fig 07-216</figcaption>
          </figure>
          <p>So now we set the Expression based on the fact that here we have some context that we're trying to evaluate
            a phone, and so we come up with a RegularExpression that's appropriate for that phone.
          </p>
          <p>Obviously, if you're going to put any complex, domain-specific logic into one of these ValidationRules,
            you're going to have to give it an appropriate name that indicates the nature of the rule that's
            encapsulated in here and what kind of value it's expected to be passed in.
          </p>
          <p>Whatever properties you choose to expose on your ValidationRules, they will have to be set with a value
            that's static in the XAML.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Binding.ValidationRules&gt;
    &lt;local:RegexValidationRule Expression=&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot; /&gt;
&lt;/Binding.ValidationRules&gt;
                </pre>
            <figcaption>Fig 07-217</figcaption>
          </figure>
          <p>Because the base class of ValidationRules is not a DependencyObject, you can't have DependencyProperties on
            it, so you can't dynamically set these properties through a binding because a binding can only target a
            DependencyProperty, so whatever properties you expose will only be able to be passed static values from the
            XAML.
          </p>
        </div>
        <div class="panel-body">
          <h3>Validating with IDataErrorInfo</h3>
          <p>One of the most common ways to implement validation in data binding in WPF and other technologies is
            IDataErrorInfo, partly because this has been around for a long time, since .NET 1.0. It was supported in
            Windows Forms and WPF and carries forward to other XAML technologies as well.
          </p>
          <p>Basically, IDataErrorInfo is an interface that defines an API, so that the binding can query for errors on
            the object that it's bound to. It's got two properties on it. First is an Error property, and that's a
            string property that's meant to be an error for the object as a whole. That one's not used a whole lot. It
            can be used in a DataGrid scenario to provide a row level indication, but when you have individual input
            fields, it's not really used at all.
          </p>
          <p>The main one that's focused on is the Indexer. So this is a C# Indexer, or an ItemProperty in Visual Basic,
            that is passed an argument that is the property name and is then expected to return a string error if there
            is a validation error for that property.
          </p>
          <p>So, as I said, it's been around for a long time, it was actually implemented in DataSet row objects in .NET
            1.0 and carrying forward, and it's very flexible and easy to use.
          </p>
          <p>One potential downside to it, depending on your perspective, is that you do have to allow the property to
            first be set.
          </p>
          <p>So the order of operations here is that the binding is going to go set a property because some input has
            been put into a field in the UI. It has to first set that property and then it will come back and query the
            IDataErrorInfo interface to basically say, are you happy with that value.
          </p>
          <p>So you have to have stored that value in the member variable, so that that subsequent call through
            IDataErrorInfo can look at the value that was set and decide whether it's an appropriate value. Once you
            have IDataErrorInfo implemented on your data object that you're going to bind to, you have to turn it on, on
            the binding.
          </p>
          <p>So there's a property on the binding that ValidatesOnDataErrors that you set to true, and that causes the
            binding to go do that process I talked about where it queries the IDataErrorInfo to see if there's an error
            associated with the property after it sets it.
          </p>
          <p>So let's take a look at a demo of how we implement this on an object and get it hooked up and using it in a
            binding.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Validating with IDataErrorInfo</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-005" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-005"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-006" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-006"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>In this demo, I'm going to show you how to implement the IDataErrorInfo interface and use that to derive
            your validation.
          </p>
          <p>Starting point here is the ending point of the last demo.</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-218.png" class="image"/>
            <figcaption>Fig 07-218</figcaption>
          </figure>
          <p>So we're going to first go and drag the CellPhone property out to generate a new field that we can do data
            binding with:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-219.png" class="image"/>
            <figcaption>Fig 07-219</figcaption>
          </figure>
          <p>I'm going to drop into the XAML for that and modify the binding that was generated to get rid of these
            extra properties, and just put one additional property, which is ValidatesOnDataErrors=true.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding CellPhone, ValidatesOnDataErrors=true}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot; /&gt;</pre>
            <figcaption>Fig 07-220</figcaption>
          </figure>
          <p>We saw ValidatesOnExceptions earlier, this is an alternative to that, using IDataErrorInfo to derive your
            validation instead of exceptions. You can certainly do both. In fact, there are times for a numeric input
            for example, bound to an integer field, that if you put in something like abc, it won't be able to convert
            it to even set the property.
          </p>
          <p>So validatesOnDataErrors won't have a chance to take effect, but validatesOnExceptions would show that
            there was a format exception thrown trying to set that property. In this case, we're dealing with a string
            property, so it's not applicable.
          </p>
          <p>Now we need to go implement IDataErrorInfo on our model object that we're binding to.</p>
          <p>So I'll drop into my Customer and add the IDataErrorInfo interface and implement it using Visual Studio.
          </p>
          <figure>
                <pre class="prettyprint">namespace ValidationDemo
{
    public class Customer : INotifyPropertyChanged, IDataErrorInfo</pre>
            <figcaption>Fig 07-221</figcaption>
          </figure>
          <p>Down at the bottom of my class it added two members</p>
          <figure>
                <pre class="prettyprint">public string Error
{
    get { throw new NotImplementedException(); }
}

public string this[string columnName]
{
    get { throw new NotImplementedException(); }
}</pre>
            <figcaption>Fig 07-222</figcaption>
          </figure>
          <p>A string called Error, and an Indexer that says columnName here, but you can think of this, really, as
            propertyName. The reason it generates it as columnName is this dates back to .NET 1.0 and the main thing
            that implemented this interface was DataSets, so columnName was there to represent a column in a DataTable
            within a DataSet, but on an Entity it's really the propertyName that's going to be passed into the Indexer
            and it returns a string.
          </p>
          <figure>
                <pre class="prettyprint">public string this[string propertyName]
{
    get { throw new NotImplementedException(); }
}</pre>
            <figcaption>Fig 07-223</figcaption>
          </figure>
          <p>So the idea here is that the Error property is meant to represent an error for the object as a whole. For
            that, I'm just going to return string.Empty.
          </p>
          <figure>
                <pre class="prettyprint">public string Error
{
    get { return string.Empty; }
}</pre>
            <figcaption>Fig 07-224</figcaption>
          </figure>
          <p>The Indexer is what we're going to focus our effort on, and the idea is that this will be invoked by the
            binding when you say NofityOnDataErrors=true, the binding will call this Indexer for the property that its
            bound to whenever it goes and sets that property. So first it will set the property, then it will invoke the
            Indexer, telling you what property has been set. So it's basically giving you an opportunity here to say,
            are you happy with the value that was set.
          </p>
          <p>You do have to first accept the value into the property:</p>
          <figure>
                <pre class="prettyprint">private string _CellPhone;
public string CellPhone
{
    get { return _CellPhone; }
    set
    {
        if (_CellPhone != value)
        {
            _CellPhone = value;
            PropertyChanged(this, new PropertyChangedEventArgs("CellPhone"));
        }
    }
}</pre>
            <figcaption>Fig 07-225</figcaption>
          </figure>
          <p>so you're going to have to let the set block be called, not throw an exception, write it into your member
            variable, so that down here in the Indexer:
          </p>
          <figure>
                <pre class="prettyprint">public string this[string propertyName]
{
    get { throw new NotImplementedException(); }
}</pre>
            <figcaption>Fig 07-226</figcaption>
          </figure>
          <p>you can then look at that value in the member variable and decide whether you like it or not, and if not,
            return an error string.
          </p>
          <p>So what I'm going to do here is I'm going to return a method:</p>
          <figure>
                <pre class="prettyprint">public string this[string propertyName]
{
    get { return GetErrorForProperty(propertyName); }
}</pre>
            <figcaption>Fig 07-227</figcaption>
          </figure>
          <p>because I don't like putting a bunch of logic in a get block of a property. Then I'll go right below that
            and implement that method:
          </p>
          <figure>
                <pre class="prettyprint">private string GetErrorForProperty(string propertyName)
{
    switch (propertyName)
    {
        case &quot;CellPhone&quot;:
            Regex regex = new Regex(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;);
            if (regex.Match(CellPhone) == Match.Empty)
                return &quot;Invalid phone format&quot;;
            else return string.Empty;
        default:
            return string.Empty;
    }
}</pre>
            <figcaption>Fig 07-228</figcaption>
          </figure>
          <p>And the nature of the method that you're going to have to implement is, unfortunately, generally a big
            switch case statement with a case for each property that you have ValidationRules you want to implement.
          </p>
          <p>That's one of the downsides of IDataErrorInfo. But because you're inside of the Entity itself, it does give
            you the flexibility to do cross-property validation, for example, if you have some consistency rule between
            property A and property B, you can inspect both of those when property A is set or when property B is set
            and come up with an error based on that.
          </p>
          <p>In our case, we're just going to inspect for the CellPhone property when it's set. We're going to use that
            same RegularExpression, see if it's a match, and return invalid phone format as an error string if it's not
            a match or just string.Empty if it's good. So basically, if you return null or string.Empty, it means
            there's no validation error, but any non-empty string means a validation error.
          </p>
          <p>So by virtue of the fact that our entity that we're binding to now implements this interface:</p>
          <figure>
            <pre class="prettyprint">public class Customer : INotifyPropertyChanged, IDataErrorInfo</pre>
            <figcaption>Fig 07-229</figcaption>
          </figure>
          <p>and our binding says that we do want to honor that interface, this binding will basically hook up to that
            interface and query for errors every time it goes to set the property that it's bound to.
          </p>
          <p>So with that, we can go ahead and run, input an invalid value, tab out, and we can see the error indication
            there.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-230.png" class="image"/>
            <figcaption>Fig 07-230</figcaption>
          </figure>
          <p>Get it into a valid value, tab out, and the error goes away. And that's really all there is to
            IDataErrorInfo.
          </p>
          <p>Mostly focused on the Indexer, go decide what property is being set, invoke whatever rules are appropriate
            for that property, come up with an error string if there is one, and return it.
          </p>
        </div>
        <div class="panel-body">
          <h3>Validating with INotifyDataError</h3>
          <p>Now a new interface that was added in .NET 4.5 that's similar to IDataErrorInfo is INotifyDataErrorInfo.
            This was originally defined in Silverlight 4 and was added to .NET 4.5 for WPF.
          </p>
          <p>It's the same basic concept that the binding can go and query for errors after it's gone and set a
            property, but it's done with an event-driven interface that allows you to go out asynchronously after the
            property has been set, triggers some ValidationRule that may take a long time to execute, such as calling a
            service, and whenever the results come back, you can raise an event that will cause the binding to re-query
            for errors.
          </p>
          <p>So to use this, you set a ValidateOnNotifyDataErrors property on the binding, the binding will call the
            GetErrors method of the INotifyDataErrorInfo after it has set a property. It also subscribes to the
            ErrorsChanged event on the interface, and so if the ErrorsChanged is fired, it will go and re-query
            GetErrors at the point where that event is raised.
          </p>
          <p>To implement this, you're going to manage a dictionary of errors under the covers, so you basically are
            going to have a set of errors per property that gets returned from the GetErrors method and GetErrors gets
            called, passing a property name similar to the Indexer on IDataErrorInfo.
          </p>
          <p>So one of the advantages here of INotifyDataErrorInfo over IDataErrorInfo is that you can return multiple
            errors per property. The Indexer on IDataErrorInfo only returns a single string, but you might have multiple
            rules associated with a single property, each producing its own error, so INotifyDataErrorInfo is more
            flexible in that way.
          </p>
          <p>So let's dive into a demo that shows an asynchronous evaluation of Rules, which is where using
            INotifyDataErrorInfo really shines.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Validating with INotifyDataError</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-007" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-007"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-008" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-008"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>In this demo, I'm going to get you familiar with INotifyDataErrorInfo, which is an asynchronous version of
            IDataErrorInfo. So starting point here is the end of the last demo where we implemented IDataErrorInfo.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-231.png" class="image"/>
            <figcaption>Fig 07-231</figcaption>
          </figure>
          <p>I'm going to drop into my Customer here and I'm going to implement INotifyDataErrorInfo instead of
            IDataErrorInfo:
          </p>
          <figure>
                <pre class="prettyprint">namespace ValidationDemo
{
    public class Customer : INotifyPropertyChanged, INotifyDataErrorInfo
    {</pre>
            <figcaption>Fig 07-232</figcaption>
          </figure>
          <p>So I changed my interface to INotifyDataErrorInfo, I will use Visual Studio to stub it out, and then I'll
            go down to the bottom here and I'm going to comment out the IDataErrorInfo methods since they're not going
            to be used anymore, and let's look at the API of INotifyDataErrorInfo.
          </p>
          <figure>
                <pre class="prettyprint">public event EventHandler&lt;DataErrorsChangedEventArgs&gt; ErrorsChanged;

public System.Collections.IEnumerable GetErrors(string propertyName)
{
    throw new NotImplementedException();
}

public bool HasErrors
{
    throw new NotImplementedException();
}</pre>
            <figcaption>Fig 07-233</figcaption>
          </figure>
          <p>First off, it's got an ErrorsChanged event and I'm going to use the delegate trick here to make it so I
            don't have to check for nulls, which was discussed earlier in the course. It's got a GetErrors method that's
            going to be queried by the binding when you hook up to it, that's the logical equivalent of the Indexer on
            IDataErrorInfo.
          </p>
          <p>So it's going to be passed in a property name, but notice this one returns an IEnumerable, so one
            difference here is that the Indexer for IDataErrorInfo only allows you to return a single error string per
            property. With INotifyDataErrorInfo, they recognize that you could have more than one rule associated with a
            given property, so you can return a collection of errors. And then there's a HasErrors property that's first
            going to be inspected by the binding before it calls GetErrors.
          </p>
          <p>So the basic sequence of events is you have a binding that you indicate that you want to use,
            INotifyDataErrorInfo, and you hook it up to an object that implements that, when it goes to set a property,
            it's going to check and call the HasErrors property:
          </p>
          <figure>
                <pre class="prettyprint">public bool HasErrors
{
    throw new NotImplementedException();
}</pre>
            <figcaption>Fig 07-234</figcaption>
          </figure>
          <p>If that returns true, then it's going to call GetErrors:</p>
          <figure>
                <pre class="prettyprint">public System.Collections.IEnumerable GetErrors(string propertyName)
{
    throw new NotImplementedException();
}</pre>
            <figcaption>Fig 07-235</figcaption>
          </figure>
          <p>If at some point after it's called GetErrors, the ErrorsChanged event fires, it will come back in and call
            GetErrors again, assuming that there is some asynchronous process that went out and determined errors,
            populated the collection of errors behind the scenes that GetErrors is using to return its values.
          </p>
          <p>So, basically, to start fleshing this out, what you need is somewhere to store some errors, and the shape
            of that is generally going to be a Dictionary&lt;string, List&lt;string&gt;&gt;:
          </p>
          <figure>
            <pre class="prettyprint">Dictionary&lt;string, List&lt;string&gt;&gt; _PropertyErrors = new Dictionary&lt;string, List&lt;string&gt;&gt;();</pre>
            <figcaption>Fig 07-236</figcaption>
          </figure>
          <p>So you want to have that collection of errors that you return up here for a given property name where the
            key is the property name. For the implementation of GetErrors, we can just simply reach into that
            PropertyErrors collection:
          </p>
          <figure>
                <pre class="prettyprint">public System.Collections.IEnumerable GetErrors(string propertyName)
{
    lock (_PropertyErrors)
    {
        if (_PropertyErrors.ContainsKey(propertyName))
            return _PropertyErrors[propertyName];
    }
    return null;
}</pre>
            <figcaption>Fig 07-237</figcaption>
          </figure>
          <p>see if there is a key for the propertyName, and if so, return whatever the value is the list of strings
            associated with it.
          </p>
          <p>Now I put a lock statement here because we're going to go and do some asynchronous work using a separate
            thread, and that separate thread needs to be able to push errors into this PropertyErrors collection.
          </p>
          <p>So if you're going to do that in a multi-threaded way, you want to make sure you protect that dictionary
            because it's not thread-safe, or you could use one of the concurrent collections that are available in the
            .NET framework. I'm just going to use a basic dictionary here and lock on it.
          </p>
          <p>Next, we need to implement this HasErrors method, so I'm going to flesh that out by calling a method:</p>
          <figure>
                <pre class="prettyprint">public bool HasErrors
{
    get { return PropertyErrorsPresent(); }
}

private bool PropertyErrorsPresent()
{
    bool errors = false;
    foreach (var key in _PropertyErrors.Keys)
    {
        if (_PropertyErrors[key] != null)
        {
            errors = true;
            break;
        }
    }
}</pre>
            <figcaption>Fig 07-238</figcaption>
          </figure>
          <p>again, because I don't like putting complex logic in a get block, personally. And what this method really
            does is it just loops through all the keys in the dictionary, checks whether the underlying value is null,
            and if there are any non-null entries in the dictionary, then it says that there are errors present, and
            It's going to return true to say that there are errors. And then the binding will come and call GetErrors
            for the property it's bound to and it will look up the errors and see if there are any. So that's a simple
            brute force implementation of INotifyDataErrorInfo, but now we need to trigger errors to happen somewhere.
          </p>
          <p>Now the whole point of this interface is to support asynchronous scenarios, places where you're going to go
            and set a property, but you need to go do something like a service call to invoke some logic on a backend to
            decide whether the value that was set is valid or not. And something like a service call takes a long time,
            and you shouldn't be blocking the UI waiting for it, so you want to go out and do that asynchronously. Now
            for demo purposes here, I'm not going to set up a service and call it, I'm just going to use a task-based
            method to simulate this.
          </p>
          <figure>
                <pre class="prettyprint">Task&lt;List&lt;string&gt;&gt; GetErrorsForPhone(string value)
{
    // Simulate async call - typically to a web service
    return Task.Factory.StartNew&lt;List&lt;string&gt;&gt;(() =&gt;
    {
        Thread.Sleep(5000);
        Regex regex = new Regex(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;);
        if (regex.Match(value) == Match.Empty)
            return new List&lt;string&gt; { &quot;Invalid phone format&quot; };
        return null;
    });
}</pre>
            <figcaption>Fig 07-239</figcaption>
          </figure>
          <p>So this method is using the Task Parallel Library, it's defining a method called GetErrorsForPhone where I
            can pass in a value. And what it's going to return, ultimately, is a list of strings, but it does it through
            a task that can be invoked asynchronously.
          </p>
          <p>So inside of this method in a real project, would be the point where I would dispatch an asynchronous
            service call, but instead what I'm doing for demo purposes is I'm just going to use Task.Factory.StartNew,
            which causes it to dispatch whatever's inside of this action delegate
          </p>
          <figure>
            <pre class="prettyprint">return Task.Factory.StartNew&lt;List&lt;string&gt;&gt;(() =&gt;</pre>
            <figcaption>Fig 07-240</figcaption>
          </figure>
          <p>on a separate thread.</p>
          <p>The first thing I'm going to do is go sleep for 5 seconds, so that you can see when I run this that's it's
            truly happening asynchronously. Then I'm going to evaluate the logic that presumably is back behind the
            service call or something that's going to take a long time to compute, and ultimately I'm returning my list
            of strings, or null if there are no errors.
          </p>
          <p>So, basically, I want this:</p>
          <figure>
                <pre class="prettyprint">Task&lt;List&lt;string&gt;&gt; GetErrorsForPhone(string value)
{
    // Simulate async call - typically to a web service
    return Task.Factory.StartNew&lt;List&lt;string&gt;&gt;(() =&gt;
    {
        Thread.Sleep(5000);
        Regex regex = new Regex(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;);
        if (regex.Match(value) == Match.Empty)
            return new List&lt;string&gt; { &quot;Invalid phone format&quot; };
        return null;
    });
}</pre>
            <figcaption>Fig 07-241</figcaption>
          </figure>
          <p>to be invoked at a point where I know that a phone value has changed. So, naturally, a good place for that
            would be in the set block of our property. So I can go up in here, and after the property has been set, I
            can dispatch some asynchronous work.
          </p>
          <figure>
                <pre class="prettyprint">private string _CellPhone;
public string CellPhone
{
    get { return _CellPhone; }
    set
    {
        if (_CellPhone != value)
        {
            _CellPhone = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;CellPhone&quot;));
            // Trigger async validation check
            GetErrorsForPhone(CellPhone).ContinueWith((errorsTask) =&gt;
            {
                lock (_PropertyErrors)
                {
                    _PropertyErrors[&quot;CellPhone&quot;] = errorsTask.Result;
                    ErrorsChanged(this, new DataErrorsChangedEventArgs(&quot;CellPhone&quot;));
                }
            });

        }
    }
}</pre>
            <figcaption>Fig 07-242</figcaption>
          </figure>
          <p>So I'm going to call that task-based method, which is non-blocking because it's asynchronous, and when it
            is complete I use a ContinueWith, this is part of the Task Parallel Library, and say what I want to do when
            it's done is basically go push any errors that came back in into that PropertyErrors collection.
          </p>
          <p>But because this is all being done async, this is going to happen on a separate thread, so this is where I
            need to also do locking on that dictionary before I try to modify it, so that only one thread at a time can
            be messing with it.
          </p>
          <p>So I basically just take the result property:</p>
          <figure>
            <pre class="prettyprint">_PropertyErrors[&quot;CellPhone&quot;] = errorsTask.Result;</pre>
            <figcaption>Fig 07-243</figcaption>
          </figure>
          <p>of the task that come back in from our ContinueWith:</p>
          <figure>
            <pre class="prettyprint">GetErrorsForPhone(CellPhone).ContinueWith((errorsTask) =&gt;</pre>
            <figcaption>Fig 07-244</figcaption>
          </figure>
          <p>that will be the list of strings that came out of my Task, and I can push that into the appropriate
            dictionary entry based on the property that I'm setting.
          </p>
          <figure>
            <pre class="prettyprint">_PropertyErrors[&quot;CellPhone&quot;] = errorsTask.Result;</pre>
            <figcaption>Fig 07-245</figcaption>
          </figure>
          <p>Once I know I've modified that collection, I need to raise that ErrorsChanged event:</p>
          <figure>
            <pre
              class="prettyprint">ErrorsChanged(this, new DataErrorsChangedEventArgs(&quot;CellPhone&quot;));</pre>
            <figcaption>Fig 07-246</figcaption>
          </figure>
          <p>associated with the INotifyDataErrorInfo and tell it what property has changed. That's going to trigger the
            binding that is tied to that property to go ahead and re-query GetErrors.
          </p>
          <p>So with all that in place, I can go ahead and run:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-247.png" class="image"/>
            <figcaption>Fig 07-247</figcaption>
          </figure>
          <p>We can go into the Cell Phone entry here, put in an invalid value, tab out of the field, count to about 5,
            and we should see a red box up here.
          </p>
          <p>Boom, so that was that 5 second delay with the thread sleep, went out, evaluated the rule, returned the
            list of strings, raised the event, and triggered a GetErrors, and the errors have been placed into the
            Errors collection in that asynchronous handling.
          </p>
          <p>Now you can see if you implement it this way, GetErrors can certainly still execute synchronously. All it's
            doing here:
          </p>
          <figure>
                <pre class="prettyprint">public System.Collections.IEnumerable GetErrors(string propertyName)
{
    lock (_PropertyErrors)
    {
        if (_PropertyErrors.ContainsKey(propertyName))
            return _PropertyErrors[propertyName];
    }
    return null;
}</pre>
            <figcaption>Fig 07-248</figcaption>
          </figure>
          <p>is returning whatever is already in the Errors collection. So if we're able to synchronously invoke a
            ValidationRule client-side up here from the set block:
          </p>
          <figure>
                <pre class="prettyprint">private string _CellPhone;
public string CellPhone
{
    get { return _CellPhone; }
    set
    {
        if (_CellPhone != value)
        {
            _CellPhone = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;CellPhone&quot;));
            // Trigger async validation check
            GetErrorsForPhone(CellPhone).ContinueWith((errorsTask) =&gt;
            {
                lock (_PropertyErrors)
                {
                    _PropertyErrors[&quot;CellPhone&quot;] = errorsTask.Result;
                    ErrorsChanged(this, new DataErrorsChangedEventArgs(&quot;CellPhone&quot;));
                }
            });

        }
    }
}</pre>
            <figcaption>Fig 07-249</figcaption>
          </figure>
          <p>of the property and populate the PropertyErrors then, those errors will show up automatically as soon as
            GetErrors gets called.
          </p>
          <p>Those errors will be returned automatically when this gets called:</p>
          <figure>
                <pre class="prettyprint"> public System.Collections.IEnumerable GetErrors(string propertyName)
{
    lock (_PropertyErrors)
    {
        if (_PropertyErrors.ContainsKey(propertyName))
            return _PropertyErrors[propertyName];
    }
    return null;
}</pre>
            <figcaption>Fig 07-250</figcaption>
          </figure>
          <p>Which happens after the PropertyChanged fires from the set block. Now notice that our demo worked even
            though we have ValidatesOnDataErrors=true here.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding CellPhone, ValidatesOnDataErrors=true, NotifyOnValidationError=True}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;</pre>
            <figcaption>Fig 07-251</figcaption>
          </figure>
          <p>There's a separate property for ValidatesOnNotifyDataErrors if you only want to support
            INotifyDataErrorInfo:
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding CellPhone, ValidatesOnNotifyDataErrors=true, NotifyOnValidationError=True}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;</pre>
            <figcaption>Fig 07-252</figcaption>
          </figure>
          <p>but ValidateOnDataErrors will also pick up INotifyDataErrorInfo.</p>
        </div>
        <div class="panel-body">
          <h3>Binding Events</h3>
          <p>Bindings offer a number of events that you can hook into for various scenarios, and one of those is very
            specific to validation. Non-specific to validation are two events, there's the Binding.TargetUpdated, which
            is an event that will fire when data flows from the source to the target, and Binding.SourceUpdated, which
            will fire when data flows in the other direction, basically, in a two-way data binding scenario when an
            input value in a field is being pushed down into the source object.
          </p>
          <p>The one that's specific to validation is Validation.ValidationError. This is an attached event that will
            fire whenever a validation error is added or removed from a control that has a binding hooked up.
          </p>
          <p>Now none of these events fire by default, you're going to have to enable them on a binding, and you do that
            with a series of properties on the Binding that are NotifyOn, and the appropriate event, and you set that to
            true.
          </p>
          <p>So you first enable it with one of these flags, and then you hook up the events above to an event handler
            in the code-behind. So let's take a look at a quick demo of using the ValidationError event, in particular,
            to be able to know when validation errors occur.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Validation Events</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-009" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-009"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-010" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-010"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>Another thing that comes in handy sometimes when working with validation is being able to hook events that
            fire when the validation state of a control changes. To do that, all we do is we drop into our binding and
            we set another property called NotifyOnValidationError=true.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding CellPhone, ValidatesOnNotifyDataErrors=true, NotifyOnValidationError=True}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;</pre>
            <figcaption>Fig 07-253</figcaption>
          </figure>
          <p>Once that flag is set, anytime the validation state of that control, meaning errors present or not,
            changes, it's going to raise a validation event, which we can hook wherever we want in our UI.
          </p>
          <p>These ValidationError events are attached events, so you can attach them to any element. So I could go into
            my TextBox here and say, ValidationError equals some handler that I'm going to put in my code-behind.
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
                     Validation.Error=&quot;cellPhoneTextBox_Error&quot;
                    Grid.Column=&quot;1&quot;</pre>
            <figcaption>Fig 07-254</figcaption>
          </figure>
          <p>Because these are bubbling events, I could also put them further up the chain. So instead of on the TextBox
            itself, I could put it all the way up at Grid level here. Now I need to add that error handler to my
            code-behind, so I'll drop into the code, add the method:
          </p>
          <figure>
                <pre class="prettyprint">private void cellPhoneTextBox_Error(object sender, ValidationErrorEventArgs e)
{
    Debug.WriteLine(e.Error.ErrorContent);
}</pre>
            <figcaption>Fig 07-255</figcaption>
          </figure>
          <p>and you can see you get passed a ValidationErrorEventArgs.</p>
          <p>This thing has several properties on it. It's got a ValidationError is the main thing you're going to look
            at and that error has a bunch of context on it.
          </p>
          <figure>
                <pre class="prettyprint">public ValidationRule RuleInError { get; set; }
public object ErrorContent { get; set; }
public Exception Exception { get; set; }
public object BindingInError { get; }</pre>
            <figcaption>Fig 07-256</figcaption>
          </figure>
          <p>The ErrorContent property is the main thing you're going to look at, it's generally going to be the error
            string that you're dealing with. So I'm just going to Debug.WriteLine out the (e.Error.ErrorContent).
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-257.png" class="image"/>
            <figcaption>Fig 07-257</figcaption>
          </figure>
          <p>Now if we go ahead and run, watch the output window on the bottom, I'll invoke my asynchronous validation,
            we'll wait the 5 seconds, and we can see Invalid phone format showed up in the output window.
          </p>
          <p>So that's all there is to hooking validation errors. Make sure you turn it on, on a binding, put the
            attached event hooked up somewhere in the UI on the element itself or some parent element, and then have the
            handler deal with the validationErrorEventArgs that flows in.
          </p>
        </div>
        <div class="panel-body">
          <h3>Validation Error Templates</h3>
          <p>As you've seen so far, WPF controls have a default error template or rendering that it shows when there's
            validation errors, which is a red box around the control but it doesn't display anything about the error
            messages themselves, and you might not always want to use a red box.
          </p>
          <p>So the Validation Class has a number of attached properties that will allow you to drive the presentation
            of errors. First off, there's the validation HasError property. This is a Boolean flag to indicate whether
            there are any errors associated with the control. You can use that as a condition for something like a
            property trigger to drive changing the style of the control.
          </p>
          <p>Then there's the Errors collection, and this will get you all of the errors associated with the control,
            generally based on a bound property, and validation errors that flowed through the binding.
          </p>
          <p>Finally, there's the ErrorTemplate. The ErrorTemplate is the custom ControlTemplate that is used when there
            are validation errors. So the default ErrorTemplate adds the red box around the control, but you can
            customize that and do whatever kind of annotation you want to the control with your own custom rendering.
          </p>
          <p>So the basic process is to provide a custom display for the control, you're going to set the ErrorTemplate
            to some custom ControlTemplate that includes a placeholder in it for the control itself. So, generally, you
            can think of it as you're surrounding the control with some kind of validation indication, but you could
            certainly overlay the control with something too.
          </p>
          <p>You might also want to do a ToolTip to show the validation errors, and the standard way to do that is to
            define a Style with a trigger on that Style that monitors the HasError property.
          </p>
          <p>When the HasError goes true, it sets a ToolTip on the control it's associated with and uses the Errors
            collection to render out the string errors associated with it. So let's take a look at a demo of how to do
            the ToolTips and how to provide a custom ErrorTemplate to modify the way it indicates errors on the screen.
          </p>
        </div>
        <div class="panel-body">
          <h3>Demo: Custom Validation Error Display</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-011" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-011"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-012" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
<span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-012"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>So far in our demos, all we've had to go by when we have a validation error is this red box that the
            control draws by default:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-258.png" class="image"/>
            <figcaption>Fig 07-258</figcaption>
          </figure>
          <p>It's not really enough information to help out the user.</p>
          <p>So let's take a look at how we can provide a custom template to either customize the appearance of how it
            highlights the box and also how we can get to the errors for display purposes.
          </p>
          <p>The first thing we might want to do is put a ToolTip on controls that have the red box so the user can
            hover over them and see what the error is. To do that, I'm going to drop into the XAML, go into the Resource
            section here, and define a Style.
          </p>
          <p>I'm going to give this Style a name of ErrorStyle and let its TargetType be FrameworkElement</p>
          <figure>
                <pre class="prettyprint">&lt;Window.Resources&gt;
    &lt;CollectionViewSource x:Key=&quot;customerViewSource&quot;
                          d:DesignSource=&quot;{d:DesignInstance {x:Type local:Customer}, CreateList=True}&quot; /&gt;
    &lt;Style x:Key=&quot;ErrorStyle&quot;
           TargetType=&quot;FrameworkElement&quot;&gt;
        &lt;Style.Triggers&gt;
            &lt;Trigger Property=&quot;Validation.HasError&quot;
                     Value=&quot;true&quot;&gt;
                &lt;Setter Property=&quot;ToolTip&quot;
                        Value=&quot;{Binding RelativeSource={x:Static RelativeSource.Self},
            Path=(Validation.Errors).CurrentItem.ErrorContent}&quot; /&gt;
            &lt;/Trigger&gt;
        &lt;/Style.Triggers&gt;
    &lt;/Style&gt;
&lt;/Window.Resources&gt;</pre>
            <figcaption>Fig 07-259</figcaption>
          </figure>
          <p>so any FrameworkElement can have a ToolTip, we don't have to constrain it to a particular type. What we're
            going to leverage here is some attached properties that the Validation Class has.
          </p>
          <p>So we set up a Trigger section to our Style:</p>
          <figure>
            <pre class="prettyprint">&lt;Style.Triggers&gt;</pre>
            <figcaption>Fig 07-260</figcaption>
          </figure>
          <p>and we set up a Property Trigger on the attached property, Validation.HasError:</p>
          <figure>
                <pre class="prettyprint">&lt;Trigger Property=&quot;Validation.HasError&quot;
                         Value=&quot;true&quot;&gt;</pre>
            <figcaption>Fig 07-261</figcaption>
          </figure>
          <p>So whichever FrameworkElement that we apply this to, basically, this is going to be monitoring the HasError
            property and whenever that HasError property goes true, the value that we specify here, it's going to
            trigger this Setter.
          </p>
          <figure>
                <pre class="prettyprint">&lt;Setter Property=&quot;ToolTip&quot;
            Value=&quot;{Binding RelativeSource={x:Static RelativeSource.Self},
            Path=(Validation.Errors).CurrentItem.ErrorContent}&quot; /&gt;</pre>
            <figcaption>Fig 07-262</figcaption>
          </figure>
          <p>This Setter is going to go set the ToolTip property of that FrameworkElement, and it's going to set it to a
            value that it obtains from the Errors collection on the Validation Class.
          </p>
          <p>So it's using a RelativeSource Binding here to basically get a reference to the element itself, use the
            attached property Validation.Errors to get the Errors collection, use the CurrentItem property, which will
            give you basically the first item in the collection in a safe way, so if there are no errors it doesn't have
            a problem trying to index in, and then the ErrorContent, which is that same thing we saw in the Validation
            events demo, which is typically the error string.
          </p>
          <p>So now we just need to tie this ErrorStyle onto our controls, so I'll drop down to my TextBox and add
            Style="(StaticResource ErrorStyle)":
          </p>
          <figure>
                <pre class="prettyprint">&lt;TextBox x:Name=&quot;cellPhoneTextBox&quot;
    Grid.Column=&quot;1&quot;
    HorizontalAlignment=&quot;Left&quot;
    Height=&quot;23&quot;
    Margin=&quot;3&quot;
    Grid.Row=&quot;0&quot;
    Text=&quot;{Binding CellPhone, ValidatesOnNotifyDataErrors=true, NotifyOnValidationError=True}&quot;
    VerticalAlignment=&quot;Center&quot;
    Width=&quot;120&quot;
    Validation.Error=&quot;cellPhoneTextBox_Error&quot;
Style=&quot;{StaticResource ErrorStyle}&quot; /&gt;</pre>
            <figcaption>Fig 07-263</figcaption>
          </figure>
          <p>Now with that in place, I can put in my abc, tab out, wait for the 5 seconds:</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-264.png" class="image"/>
            <figcaption>Fig 07-264</figcaption>
          </figure>
          <p>and now when I hover over that we can see we get a ToolTip that tells us Invalid phone format is the
            problem.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-265.png" class="image"/>
            <figcaption>Fig 07-265</figcaption>
          </figure>
          <p>Now you might also want to customize the way the control displays that error. Instead of a red box, you
            might want some kind of icon next to it. To do that, we're going to go back up to the Resource section and
            define a couple more resources. Now this does require you to understand ControlTemplates a little bit:
          </p>
          <figure>
                <pre class="prettyprint">&lt;ControlTemplate x:Key=&quot;TextBoxErrorTemplate&quot;&gt;
    &lt;DockPanel&gt;
        &lt;Ellipse DockPanel.Dock=&quot;Right&quot;
                 Margin=&quot;2,0&quot;
                 ToolTip=&quot;Contains invalid data&quot;
                 Width=&quot;10&quot;
                 Height=&quot;10&quot;&gt;
            &lt;Ellipse.Fill&gt;
                &lt;LinearGradientBrush&gt;
                    &lt;GradientStop Color=&quot;#11FF1111&quot;
                                  Offset=&quot;0&quot; /&gt;
                    &lt;GradientStop Color=&quot;#FFFF0000&quot;
                                  Offset=&quot;1&quot; /&gt;
                &lt;/LinearGradientBrush&gt;
            &lt;/Ellipse.Fill&gt;
        &lt;/Ellipse&gt;
        &lt;AdornedElementPlaceholder /&gt;
    &lt;/DockPanel&gt;
&lt;/ControlTemplate&gt;</pre>
            <figcaption>Fig 07-266</figcaption>
          </figure>
          <p>because what we're doing is we're defining a custom ControlTemplate that we're going to apply to our input
            control.
          </p>
          <p>The structure of what you put in that ControlTemplate is totally up to you, but there's a magic element
            that you need to have in here called AdornedElementPlaceholder, and this is basically going to be a
            placeholder where the normal TextBox visual tree is going to be placed within this ControlTemplate and
            whatever else you put around it is up to you. So you can think of it as you're wrapping the normal TextBox
            with something that you want to show and we're only going to show this when there's a validation error.
          </p>
          <p>So what I've got here is I've got a DockPanel. The last element in a DockPanel will fill the DockPanel. And
            then notice, I put an Ellipse, which I Dock to the Right, and just have some structure to that Ellipse. So
            this is basically going to give us a little gradient-shaded round circle. Notice it also has a ToolTip
            associated with it:
          </p>
          <figure>
            <pre class="prettyprint">ToolTip=&quot;Contains invalid data&quot;</pre>
            <figcaption>Fig 07-267</figcaption>
          </figure>
          <p>that we can hover over. So we've defined this ControlTemplate and now we have to associate it with the
            controls that are going to use it.
          </p>
          <p>So we apply an implicit Style here which is going to apply to all TextBoxes that don't already have a
            Style
          </p>
          <figure>
                <pre class="prettyprint">&lt;Style TargetType=&quot;TextBox&quot;&gt;
    &lt;Setter Property=&quot;Margin&quot;
            Value=&quot;4,4,15,4&quot; /&gt;
    &lt;Setter Property=&quot;Validation.ErrorTemplate&quot;
            Value=&quot;{StaticResource TextBoxErrorTemplate}&quot; /&gt;
    &lt;Style.Triggers&gt;
        &lt;Trigger Property=&quot;Validation.HasError&quot;
                 Value=&quot;True&quot;&gt;
            &lt;Setter Property=&quot;ToolTip&quot;&gt;
                &lt;Setter.Value&gt;
                    &lt;Binding Path=&quot;(Validation.Errors).CurrentItem.ErrorContent&quot;
                             RelativeSource=&quot;{x:Static RelativeSource.Self}&quot; /&gt;
                &lt;/Setter.Value&gt;
            &lt;/Setter&gt;
        &lt;/Trigger&gt;
    &lt;/Style.Triggers&gt;
&lt;/Style&gt;</pre>
            <figcaption>Fig 07-268</figcaption>
          </figure>
          <p>setting some margin, and then the key thing here is we're setting the ErrorTemplate and this
            Validation.ErrorTemplate is an attached property that we can set and we're setting it to our ControlTemplate
            that we just defined up above.
          </p>
          <p>Validation system is smart enough to know, only use this template:</p>
          <figure>
                <pre class="prettyprint">&lt;Setter Property=&quot;Validation.ErrorTemplate&quot;
                    Value=&quot;{StaticResource TextBoxErrorTemplate}&quot; /&gt;</pre>
            <figcaption>Fig 07-269</figcaption>
          </figure>
          <p>if there are validation errors. In addition, we want a ToolTip on these controls as well, so similar to the
            Style trigger that we put separately, we embed that same ToolTip using the "(Validation.Errors)
            CurrentItem.ErrorContent" when there is an error on the control.
          </p>
          <p>So with that in place, we can run</p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-270.png" class="image"/>
            <figcaption>Fig 07-270</figcaption>
          </figure>
          <p>and remember on the Cell Phone we had applied a Style explicitly for the ToolTip, but the other two don't
            have a Style applied, so we can see that now we get that red dot to the right, instead of a red box around
            the control. And, if we hover over the red dot, we get the, Contains invalid data that is part of that
            ellipse.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-271.png" class="image"/>
            <figcaption>Fig 07-271</figcaption>
          </figure>
          <p>If we hover over the TextBox, we get the Invalid input format that's coming out of the ToolTip. So that's
            how you can provide a custom Error indication for a control by providing a ControlTemplate that contains the
            AdornedElementPlaceholder for the normal control and whatever you want to surround it with, and making sure
            you set that as the ErrorTemplate for the control that you want.
          </p>
        </div>
        <div class="panel-body">
          <h3>DataAnnotations</h3>
          <p>The last thing I want to talk about in this module is using DataAnnotations. DataAnnotations are a
            namespace in the .NET framework, specifically System.ComponentModel.DataAnnotations, that have become very
            widespread for validation purposes.
          </p>
          <p>It's a common mechanism for expressing validation rules on properties, done through attributes. There's a
            set of built-in attributes for common scenarios, including Required, RegularExpressions, StringLength,
            Range, Phone, Email, Url, CreditCard, and then there's a CustomValidation attribute that you can use to
            point to a method where you put your own custom logic.
          </p>
          <p>Basically, you put these attributes on a property and they will be evaluated in validation scenarios. Now
            they can be automatically evaluated by some parts of .NET, specifically, ASP.NET model binding will
            automatically evaluate DataAnnotation attributes. Entity Framework will also automatically evaluate them.
            And it's somewhat defunct at this point, but Silverlight RIA Services also had built-in support for this.
          </p>
          <p>Now WPF does not automatically evaluate these, so you have to write a little bit of code using two classes
            from the DataAnnotations namespace, ValidationContext and Validator, to get it to, basically, reflect on the
            property, find the attributes, evaluate the rule, and return an appropriate error if validation has failed.
          </p>
          <p>So let's take a look at how we can integrate this into our validation scenarios in WPF.</p>
        </div>
        <div class="panel-body">
          <h3>Demo: DataAnnotations</h3>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-013" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\before\ValidationDemo\ValidationDemo.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-013"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>
          <div class="example">
            <div class="input-group">
              <input id="Ex09-014" type="text" class="form-control"
                     value="C:\Development Tutorials\Pluralsight-Courses\WPF Data Binding in Depth\Module 9\after\ValidationDemo\ValidationDemo.sln">
              <span class="input-group-btn"><button class="btn" data-clipboard-target="#Ex09-014"><img src="/./src/assets/clippy.svg" width="13" alt="Copy to clipboard"></button></span>
            </div>
          </div>

          <p>Now another thing you should be familiar with respective to validation that's very common in the .NET
            framework and other parts of the framework, are DataAnnotations.
          </p>
          <p>DataAnnotations are a capability that comes in from a reference that you'll add to your project called
            System.ComponentModel.DataAnnotations:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-272.png" class="image"/>
            <figcaption>Fig 07-272</figcaption>
          </figure>
          <p>DataAnnotations are known by Entity Framework, ASP.NET, Silverlight RIA Services, and you can enable them
            in WPF very easily.
          </p>
          <p>First what we're going to do is define a base class that we can put on our entities and I'll call this
            EntityBase.
          </p>
          <figure>
                <pre class="prettyprint">public class EntityBase
{
    protected virtual void ValidateProperty(string propertyName, object value)
    {
        ValidationContext context = new ValidationContext(this, null, null);
        context.MemberName = propertyName;
        Validator.ValidateProperty(value, context);
    }
}</pre>
            <figcaption>Fig 07-273</figcaption>
          </figure>
          <p>And we're using this to encapsulate just the few lines of code that we need to evaluate DataAnnotations.
          </p>
          <p>Specifically, there's a class called the ValidationContext.</p>
          <figure>
            <pre
              class="prettyprint">ValidationContext context = new ValidationContext(this, null, null);</pre>
            <figcaption>Fig 07-274</figcaption>
          </figure>
          <p>You pass it a reference to the object that you're trying to validate, you set a property on it called
            MemberName to tell it what property is being evaluated:
          </p>
          <figure>
            <pre class="prettyprint">context.MemberName = propertyName;</pre>
            <figcaption>Fig 07-275</figcaption>
          </figure>
          <p>and then you use the Validator class .ValidateProperty method, passing in the value that's being set on
            that property, and the context object that you created up above:
          </p>
          <figure>
            <pre class="prettyprint">Validator.ValidateProperty(value, context);</pre>
            <figcaption>Fig 07-276</figcaption>
          </figure>
          <p>that wraps the object being validated.</p>
          <p>ValidateProperty is going to throw an exception if this value is not appropriate based on attributes that
            you can put on the properties. So this is basically some infrastructure that you need, to get DataAnnotation
            attributes evaluated. So let's go add some attributes.
          </p>
          <p>I'm going to comment out the ValidatePhone method call here in the HomePhone property, and I'm going to add
            several DataAnnotation attributes.
          </p>
          <figure>
                <pre class="prettyprint">private string _HomePhone;
[RegularExpression(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;)]
[Required]
[StringLength(12)]
public string HomePhone
{
    get { return _HomePhone; }
    set
    {
        if (_HomePhone != value)
        {
            //ValidatePhone(value);
            _HomePhone = value;
            PropertyChanged(this, new PropertyChangedEventArgs(&quot;HomePhone&quot;));
        }
    }
}</pre>
            <figcaption>Fig 07-277</figcaption>
          </figure>
          <p>So first off, I'm going to put a RegularExpression:</p>
          <figure>
            <pre class="prettyprint">[RegularExpression(@&quot;^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$&quot;)]</pre>
            <figcaption>Fig 07-278</figcaption>
          </figure>
          <p>as one of the built-in attributes, so that we can just declaratively put the RegularExpression that applies
            to this property, right there where it's defined, instead of having to call out to some method and go see
            what that method does and write the Regex code to evaluate it.
          </p>
          <p>Likewise, we could say this is a Required field:</p>
          <figure>
            <pre class="prettyprint">[Required]</pre>
            <figcaption>Fig 07-279</figcaption>
          </figure>
          <p>and it will give a validation error if it's empty or null. We could give it a StringLength:</p>
          <figure>
            <pre class="prettyprint">[StringLength(12)]</pre>
            <figcaption>Fig 07-280</figcaption>
          </figure>
          <p>If it was a numeric value, there is a Range attribute. There's also a CustomValidation attribute that you
            can point to a method to encapsulate your own logic. So these are just a nice declarative way to put
            attributes on a property to indicate what the ValidationRule associated with that property is. But
            attributes don't do anything unless some code goes and evaluates them.
          </p>
          <p>So that is why we put that EntityBase class in place, if we add EntityBase:</p>
          <figure>
            <pre class="prettyprint">public class Customer : EntityBase, INotifyPropertyChanged, INotifyDataErrorInfo</pre>
            <figcaption>Fig 07-281</figcaption>
          </figure>
          <p>as a base class for our entity, and then in the property we invoke that validate method. So we call
            ValidateProperty on our base class
          </p>
          <figure>
            <pre class="prettyprint">ValidateProperty(&quot;HomePhone&quot;, value);</pre>
            <figcaption>Fig 07-282</figcaption>
          </figure>
          <p>passing in the property name and the value that's being set.</p>
          <p>That's going to trigger that code down in EntityBase:</p>
          <figure>
                <pre class="prettyprint">public class EntityBase
{
    protected virtual void ValidateProperty(string propertyName, object value)
    {
        ValidationContext context = new ValidationContext(this, null, null);
        context.MemberName = propertyName;
        Validator.ValidateProperty(value, context);
    }
}</pre>
            <figcaption>Fig 07-283</figcaption>
          </figure>
          <p>to use the ValidationContext and Validator to basically reach back up to this property, pull off each of
            the DataAnnotation attributes, execute them to find out if there's an error, and if so, throw an exception
            with those errors. So with that in place, we can go ahead and run, go to our Home Phone, see the
            StringLength, for example, tab out of the field, and we can see we get our field Home Phone must be a string
            with a maximum length of 12.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-284.png" class="image"/>
            <figcaption>Fig 07-284</figcaption>
          </figure>
          <p>So it even gives you a nice error string there based off of the attribute, and those are localizable. If
            you have some custom error you want, you can see that there are name parameters including ErrorMessage,
            ErrorMessageResource string and Type if you're using resources for localization, and a MinimumLength.
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-285.png" class="image"/>
            <figcaption>Fig 07-285</figcaption>
          </figure>
          <p>Now one other thing to point out is, if you don't want to do it with exceptions, now this is working
            because we have ValidateOnExceptions on our binding. If you don't want to do it with exceptions, there's an
            alternative way on the Validator class called TryValidateProperty:
          </p>
          <figure>
            <img src="./images/wpfdatabindingindepth/Fig07-286.png" class="image"/>
            <figcaption>Fig 07-286</figcaption>
          </figure>
          <p>This will return a Boolean flag and it will populate a collection of validationResults with any errors that
            result. So you can integrate this with the IDataErrorInfo pattern to return the collection strings that come
            out of this if there was an error, instead of throwing an exception.
          </p>
          <p>I'm just going to leave it with the ValidateProperty here, but generally just throwing the exception and
            using ValidatesOnExceptions will work nicely.
          </p>
          <p>So that's all there is to using DataAnnotations, put the appropriate attributes on your properties, have
            the few lines of code invoked that get those DataAnnotations evaluated.
          </p>
        </div>
        <div class="panel-body">
          <h3>Summary</h3>
          <p>In this module, we covered the key capabilities of using validation with data binding. First off, we
            started with the easy stuff, which is, if you want to use an exception to indicate that a value that's being
            set on a set block is an invalid value, then you simply throw that exception and set the
            ValidatesOnExceptions property on your binding. Control will kick in, it'll show whatever ErrorTemplate it
            has, and it will indicate that there's a validation error for that input.
          </p>
          <p>
            You saw another mechanism, that's specific to WPF, is to use ValidationRules. You inherit from the
            ValidationRule base class, you override a Validate method, you implement whatever logic is appropriate for
            your ValidationRule in that class, and then you attach that ValidationRule to a binding. You have to use an
            expanded syntax for the binding, using nested elements instead of curly braces, and those ValidationRules
            don't have a lot of context passed in, just simply a value, so you often need to put additional properties
            on there and set them from the XAML so that the ValidationRule can have some decent logic in it. But these
            are a decent way to define an encapsulated rule that can be reusable across different scenarios in your
            applications.
          </p>
          <p>Next, we looked at IDataErrorInfo, which is the most common way of doing validation on business objects and
            has been around since .NET 1.0. IDataErrorInfo is an interface you implement on your model objects that will
            be queried by the binding when you enable it, after it sets the property. And that querying basically lets
            the binding ask the object, are you happy with the value I just set on a given property, and your
            implementation is expected to return an error string if not. The control will then kick in and indicate that
            there's a validation error.
          </p>
          <p>Next we covered INotifyDataErrorInfo, which is an asynchronous version of IDataErrorInfo. It came in, in
            .NET 4.5 and it supports scenarios where you may need to go make an asynchronous call to something like a
            Service to determine whether an input value is valid. You can then raise an event that will cause the
            binding to re-query for errors and show the error indications at the point where the error arrives.
          </p>
          <p>Next, we talked about some binding and validation events that are available, and you saw that these are
            simple events that you can hook up on your controls, and the validationError event, in particular, ties in
            with validation to let you have handling in your code-behind whenever the validation state of a control
            changes.
          </p>
          <p>Next, we looked at how you can provide custom ControlTemplates to change the way built-in controls render
            when there is a validation error. Instead of the default red box around the control, you can put a red dot
            to the right, you can put an overlay on it, you could put dancing bears and spinning stars on the control if
            you like. We also covered how you can provide a ToolTip to present the error information.
          </p>
          <p>Finally, we finished off with DataAnnotations and explained that they are a standard way in .NET, using
            attributes to indicate validation rules associated with the property. There's a set of built-in
            DataAnnotation attributes for common scenarios, such as Required, StringLength, and RegularExpression, and
            you can write your own custom rules and attach them through DataAnnotations as well. You saw that in WPF you
            need a little bit of code to get the DataAnnotations evaluated, but that's easy to introduce from the set
            blocks of your properties.
          </p>
        </div>
        <div class="panel-body">
          <p>So that completes our course on WPF data binding in depth. You got a good end-to-end coverage of all the
            capabilities of WPF data binding, starting with the data binding Overview, where we covered the basics of
            bindings and DataContext, and so on.
          </p>
          <p>We got into Data Sources and what kinds of objects you can work with, what types of interfaces and support
            those objects need, as well as what types of collections you want to work with for data binding. We got into
            the Binding Core Concepts, talking about things like alternate ways of expressing what the source object is,
            what the path on that source object is, and what the direction of flow of data with the Mode property is.
          </p>
          <p>We got into the more advanced properties of data bindings and talked about things like doing Async bindings
            and the UpdateSourceTrigger property to trigger when data flows, and using FallbackValues and StringFormats,
            and so on.
          </p>
          <p>We covered DataTemplates in depth, and you saw that those really start to unleash the power of data binding
            to allow you to have custom rendering of your data-bound objects in any kind of container control that's
            going to do data binding.
          </p>
          <p>We looked at the Design Time features in Visual Studio and a little bit in Blend, that help you get really
            productive with data binding, dragging and dropping your way to a data-bound UI and generating the UI
            elements and getting them a decent layout to start with.
          </p>
          <p>We dove under the covers a little bit and showed you what's really going on when data binding occurs in
            building up the visual tree based on the data-bound objects.
          </p>
          <p>And we reviewed the common collection controls and made sure you really knew how to use all the properties
            associated with data bindings for things like ComboBoxes, ListBoxes, TabControls, and DataGrids, as well as
            CollectionViewSources.
          </p>
          <p>And finally, we finished off in this module with Validation. So that pretty much wraps it up. Thank you
            very much for viewing the course. Please recommend it to your friends. Be sure to come back and watch parts
            again if you need to review concepts and review the code, and hopefully at this point you feel very
            well-equipped to go start hooking up your complex data-bound UIs for your business applications.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WPFDataBindingInDepth09DataInputValidation.vue'
}
</script>

<style scoped>

</style>
