const help = (argv) => {
  console.log(`
  git-cm <command>:

  description: Choose different types and enter the main information
                to complete the submission of the git commit.

  Usage:
   
  git-cm -a    submit the current changes to the Stage
  git-cm -m   submit commit information
  git-cm -am  after submitting the current changes to the Stage, Submit commit information

  git-cm use   more help 
  git-cm -u    more help

  `)
}

export default help