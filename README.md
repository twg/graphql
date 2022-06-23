# graphql
This is a basic graphql playbook using node, express and express-graphql. It is kind of starter graphql project where the devs with no prior knowledge of graphql can clone this repository, play around and maybe enhance some changes according to their new requirements if need be.

## Setup
To clone the repository run the below command in your terminal:\ 
`git clone https://github.com/twg/graphql.git`\
Now run the below command to download all the required dependancy:\
`npm i or install`\
To run the application, run the below command:\
`npm run develop`\
Open http://localhost:3000/graphql and pass the query in below format:
```
query{
  getAllUsers{
    email
  }
}
```


