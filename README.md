# WAFadmin
echo 'AWS_SECRET_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEZ' >foo.txt

UserName=test
PASSWORD='sadsadsadsa'

sudo docker run zricethezav/gitleaks  --username=${env} --password=${env} --repo-url=https://github.com/nnbaokhang/WAFadmin --files-at-commit=latest -v
