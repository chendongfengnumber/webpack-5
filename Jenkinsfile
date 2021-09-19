import java.text.SimpleDateFormat
node {
    try{
        //此处如此命名是为了发布到腾讯docker仓库，可自行修改
        def dockerId='tengxun'
        def dockerUrl='ccr.ccs.tencentyun.com'
        def dockerNamespace='font'
        def dockerName='webpack-web'
        //环境配置，没有使用vue自带的环境配置，自定义了一个js存放服务器地址，参考下一节
        def env='test'

        def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
        def dockerTag = dateFormat.format(new Date())

        stage('git 拉取代码'){
            sh 'pwd'
            git credentialsId: '65df5b34-ed8c-4f94-95c7-18e4cb123a95', url: 'https://github.com/chendongfengnumber/webpack-5.git'
        }
        stage('安装依赖执行打包') {
            docker.image('node:11-alpine').inside {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('docker生成镜像') {
            sh 'pwd'
            sh 'ls'
            def imageUrl = "${dockerUrl}/${dockerNamespace}/${dockerName}:${dockerTag}"
            def customImage = docker.build(imageUrl)
            sh "docker rm -f ${dockerName} | true"
            customImage.run("-it -p 7100:80 --name ${dockerName} -e env=${env}")
            //only retain last 3 images
            sh """docker rmi \$(docker images | grep ${dockerName} | sed -n  '4,\$p' | awk '{print \$3}') || true"""
        }
        currentBuild.result="SUCCESS"
    }catch (e) {
        currentBuild.result="FAILURE"
        throw e
    } finally {
        //发布邮件，请自行配置Jenkins邮件服务，不发送直接删除
        // mail to: 'xxx@qq.com',subject: "Jenkins: ${currentBuild.fullDisplayName}，${currentBuild.result}",body:"${currentBuild.result}"
    }
}

