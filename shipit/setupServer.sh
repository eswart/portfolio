#!/bin/bash

# Change these to match the project
SERVER_LOGIN_USER="kcorbett"
SERVER_IP_ADDRESS="172.99.68.11"
DEPLOY_USER="deploytrulicityweb"


# Current Directory
SETUP_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Generate SSH Key
echo "###############################################################################"
echo "Step 1: Generating New Private Key"
echo "###############################################################################"
rm ${SETUP_SCRIPT_DIR}/deploy_ke* > /dev/null
ssh-keygen -t rsa -b 4096 -C "${DEPLOY_USER}@inventivhealth.com" -f ${SETUP_SCRIPT_DIR}/deploy_key -N ""

# Create the deploy system user
echo "###############################################################################"
echo "Step 2: Logging into the server to create the deploy user, enter the password"
echo "        for the user when prompted"
echo "###############################################################################"
ssh -t ${SERVER_LOGIN_USER}@${SERVER_IP_ADDRESS} "sudo addgroup ${DEPLOY_USER}; sudo adduser --disabled-password --ingroup ${DEPLOY_USER} ${DEPLOY_USER}; sudo -u ${DEPLOY_USER} mkdir /home/${DEPLOY_USER}/.ssh"

echo "###############################################################################"
echo "Step 3: Copying the public key up to the server, enter the password for the"
echo "        user when prompted"
echo "###############################################################################"
cp ${SETUP_SCRIPT_DIR}/deploy_key.pub ${SETUP_SCRIPT_DIR}/authorized_keys
scp ${SETUP_SCRIPT_DIR}/authorized_keys ${SERVER_LOGIN_USER}@${SERVER_IP_ADDRESS}:/home/${SERVER_LOGIN_USER}
rm ${SETUP_SCRIPT_DIR}/authorized_keys

echo "###############################################################################"
echo "Step 4: Moving the public key to the right place and creating the correct"
ecgi "        directories, enter the password for the user when prompted"
echo "###############################################################################"
ssh -t ${SERVER_LOGIN_USER}@${SERVER_IP_ADDRESS} "sudo cp ~/authorized_keys /home/${DEPLOY_USER}/.ssh/authorized_keys; sudo chown ${DEPLOY_USER}:${DEPLOY_USER} /home/${DEPLOY_USER}/.ssh/authorized_keys; sudo chmod 700 /home/${DEPLOY_USER}/.ssh; sudo chmod 644 /home/${DEPLOY_USER}/.ssh/authorized_keys"
