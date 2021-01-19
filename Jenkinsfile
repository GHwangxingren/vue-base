pipeline {
  agent any
  post {
    failure {
      updateGitlabCommitStatus name: 'build', state: 'failed'
      sh "$JENKINS_HOME/workspace/scripts/wx_msg_push.sh '【PROGECT_NAME】' '【${BRANCH_NAME}】' '【${BUILD_DISPLAY_NAME}】' '【${GIT_COMMIT}】' '构建结果：构建失败！'"
    }
    success {
      updateGitlabCommitStatus name: 'build', state: 'success'
      sh "$JENKINS_HOME/workspace/scripts/wx_msg_push.sh '【PROGECT_NAME】' '【${BRANCH_NAME}】' '【${BUILD_DISPLAY_NAME}】' '【${GIT_COMMIT}】' '构建结果：构建成功！'"
    }
  }
  options {
    gitLabConnection('gitlab.huixiaoer.com')
  }
  stages {
    stage('Start') {
     when {
        anyOf{
            branch 'dev'
        }
      }
      steps {
        updateGitlabCommitStatus name: 'build', state: 'pending'
        sh "chmod u+x $JENKINS_HOME/workspace/scripts/wx_msg_push.sh"
        sh "$JENKINS_HOME/workspace/scripts/wx_msg_push.sh '【PROGECT_NAME】' '【${BRANCH_NAME}】' '【${BUILD_DISPLAY_NAME}】' '【${GIT_COMMIT}】' '构建中...'"
      }
    }
    stage('Build') {
      steps {
        sh "echo start Building"
        sh "echo 当前系统信息："
        sh "uname -a"
      }
    }
    stage('Deploy') {
      when {
        anyOf{
            branch 'dev'
        }
      }
      steps {
        sh "$JENKINS_HOME/workspace/scripts/common_fe_dev.sh PROGECT_DIR"
      }
    }
  }
}
