const { request } = require("@octokit/request");
const [,, repository, token, version] = process.argv;

getNumber().then(number => console.log(number ?? ''))


async function getNumber() {
    const issues = await request(`GET /repos/${repository}/issues`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            authorization: `token ${token}`
        }
    }).then(res => res.data)


    const number = issues.find(issue => {
        return issue.labels.findIndex(label => label.name === version) !== -1
    })?.number;

    return number
}