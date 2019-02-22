
//https://www.youtube.com/watch?v=NYq9J-Eur9U

document.getElementById( 'issueInputForm' ),addEventListener( 'submit', saveIssue )

function saveIssue( e ) {

    let issueDesc       = document.getElementById( 'issueDescInput' ).value;
    let issueSeverity   = document.getElementById( 'issueSeverityInput' ).value;
    let issueAssignedTo = document.getElementById( 'issueAssignedToInput' ).value;
    let issueId         = chance.guid(); //chance.js plugin
    let issueStatus     = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if ( localStorage.getItem( 'issues' ) == null ) {

        let issues = [];
        issues.push( issue );
        localStorage.setItem( 'issues', JSON.stringify( issues ) )
        
    }else {

        let issues = JSON.parse( localStorage.getItem( 'issues' ) );
        issues.push( issue );
        localStorage.setItem( 'issues', JSON.stringify( issues ) )

    }

    document.getElementById( 'issueInputForm' ).reset();

    fetchIssues();

    e.preventDefault();

}

function setStatusClosed( id ) {

    let issues = JSON.parse( localStorage.getItem( 'issues' ) );

    for (const issue of issues) {

        if ( issue.id == id ) issue.status = 'Closed';

    }

    localStorage.setItem( 'issues', JSON.stringify( issues ) );

    fetchIssues();
        
}

function deleteIssue( id ) {

    let issues = JSON.parse( localStorage.getItem( 'issues' ) );

    for (const issue of issues) {

        let index = issues.indexOf(issue);
        if ( issue.id == id ) issues.splice(index, 1);

    }

    localStorage.setItem( 'issues', JSON.stringify( issues ) );

    fetchIssues();

}

function fetchIssues() {

    let issues     = JSON.parse( localStorage.getItem( 'issues' ) );
    let issuesList = document.getElementById( 'issuesList' );

    issuesList.innerHTML = '';

    for (const issue of issues) {

        let id         = issue.id;
        let desc       = issue.description;
        let severity   = issue.severity;
        let assignedTo = issue.assignedTo;
        let status     = issue.status;

        issuesList.innerHTML += `<div class="card mb-3 bg-light">
                                    <div class="card-body">
                                        <h6 class="card-subtitle mb-2 text-muted">Issue ID: ${id}</h6>
                                        <p><span class="badge badge-info">${status}</span></p>
                                        <h3 class="card-title">${desc}</h3>
                                        <p class="card-subtitle mb-2 text-muted"><span class="glyphicon glyphicon-time"></span>${severity}</p>
                                        <p class="card-text"></span>${assignedTo}</p>
                                        <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                                        <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                                    </div>
                                 </div>`
        
    }

}