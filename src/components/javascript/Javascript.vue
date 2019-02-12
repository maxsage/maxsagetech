<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Javascript</h2>
        </div>
        <div class="panel-body">
          <h3>The Complete Javascript Course</h3>
          <a target="blank"
             href="https://www.udemy.com/the-complete-javascript-course/learn/v4/t/lecture/5869076?start=0">The Complete
            Javascript Course on Udemy</a><br/>
          <router-link to="/thecompletejavascriptcourse/" active-class="active"><a>The Complete Javascript Course</a>
          </router-link>
          <p>Jonas Schmedtmann has a <a href="http://codingheroes.io/resources/">website</a> that contains resources
            that relate to this course and other coding/web design topics.</p>
          <p>The course material github repo is <a
            href="https://github.com/jonasschmedtmann/complete-javascript-course">here</a> I cloned it to <span
            class="filename">c:developmenttutorials\complete-javascript-course</span></p>
          <p>I then unlinked it with the original repository and linked it to one on my github account:</p>
          <ul>
            <li>Created a new github repo</li>
            <li>Issued the <span class="terminal">git remote rm origin</span> command to remove origin as the local name
              of the remote repository.
            </li>
            <li>Issued the <span class="terminal">git remote add origin
              https://github.com/maxsage/thecompletejavascriptcourse.git</span> command to add back origin as the local
              name of the remote repository but this time pointing to my github repo.
            </li>
            <li>Issued the <span class="terminal">git push --set-upstream origin master</span> command which sets the
              default remote branch for the current local branch
            </li>
          </ul>
          <p>Date Completed: n/a</p>
          <p>Rating: n/a</p>
          <p>Review not available at this time.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Javascript'
}
</script>

<style scoped>

</style>
