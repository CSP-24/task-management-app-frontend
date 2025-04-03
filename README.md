# Prerequisites

This requires an AWS S3 Bucket configured for static website hosting. Complete guidelines can be found [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html).

- Create an AWS S3 Bucket
- Choose **Properties**.
- Under **Static website hosting**, choose **Edit**.
- Choose **Use this bucket to host a website**.
- Under **Static website hosting**, choose **Enable**.
- In **Index document**, enter **index.html**.
- Choose **Save changes**.
- Choose **Permissions**.
- Disable **Block all public access**
- Add the following bucket policy. Replace **bucket-name**

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::bucket-name/*"
        }
    ]
}
```


## Manual Deployment

- Update env variables in **.env**
- Run the following commands

```
npm install
npm run build
```

- Upload the files in **/dist** to the AWS S3 Bucket that will be used for static website hosting

## Local

- Update env variables in **.env**
- Run the following command

```
npm install
npm run dev
```
