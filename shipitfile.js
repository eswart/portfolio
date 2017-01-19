/**
 * This file makes deploying to the server as easy as running.
 *
 *     shipit production deploy
 *
 * Running the deploy command will upload the project to the server into a timestamped
 * release directory.  It will then create a symbolic link from that release directory
 * to a current directory.  That way the most recent release is can always be found
 * at that current directory and you just need to create a symbolic link from your
 * server to that directory.
 *
 * If you don't already have shipit installed you will need to install it with
 *
 *     npm shipit-cli install -g
 *
 * Getting this all to work involves a little setup on the server.
 *
 * 1. Create a "deploy" user on the server
 *
 *     adduser deploy
 *
 * 2. Create a home directory that the deploy user owns
 *
 *    mkdir /home/deploy
 *    chown deploy:deploy /home/deploy
 *
 * 3. Create an .ssh folder in that home directory with an authorized_keys file
 *    containing the deploy_key.pub file from the /shipit directory in this package
 *
 *    scp shipit/deploy_key.pub user@server:/home/deploy/.ssh/authorized_keys
 *
 *    Make sure that the .ssh folder has 700 permissions and that the authorized_keys
 *    file has 644.
 *
 * 4. Symlink the theme folder from the wordpress install to the current directory
 *    that is built by the script.
 */

module.exports = function (shipit) {

    shipit.initConfig({
        default: {
            dirToCopy: 'dist',
            releasesToKeep: 3,
            key: 'shipit/deploy_key',
            servers: 'deploytrulicityweb@172.99.68.11',
        },
        staging: {
            deployTo: '~/TrulicityWeb',
        }
    });

    shipit.task("build", function(){
        console.log(console.log("Building the distribution copy of the site"));
        return new Promise(function(fulfill) {
            shipit.local('gulp')
                .then(function(){
                    fulfill();
                    shipit.emit("built");
                });
        });
    });

    shipit.task("copyToServer", function(){
        console.log(console.log("Copying the files to the server"));
        console.log(console.log("Coping files in " + shipit.config.dirToCopy + " to " + shipit.config.deployTo + " on the server."))

        return new Promise(function(fulfill) {
            shipit.local('chmod 600 ' + shipit.config.key).then(function(){
                shipit.remoteCopy(shipit.config.dirToCopy + "/.", shipit.config.deployTo + "/current").then(function(){
                    shipit.emit("deployed");
                    fulfill();
                });
            });
        });
    });

    shipit.task('deploy', function(){
        console.log(console.log("STARTING DEPLOY"));
        return new Promise(function(fulfill) {
            shipit.start('build')
            shipit.on('built', function(){
                shipit.start('copyToServer');
                shipit.on("deployed", function(){
                    fulfill();
                });
            });
        });
    });
};
