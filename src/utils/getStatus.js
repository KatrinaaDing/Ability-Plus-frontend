/**
 * Author: Ziqi Ding
 * Created At: 12 Jul 2022
 * Discription: A convertor of status code and string
 */
const statusBank = {
    proposal: {
        draft: {
            code: 0,
            label: 'Draft'
        },
        submitted: {
            code: 1,
            label: 'Submitted'
        },
        approving: {
            code: 2,
            label: 'Approving'
        },
        approved: {
            code: 3,
            label: 'Approved'
        },
        rejected: {
            code: 4,
            label: 'Rejected'
        }
    },
    request: {
        draft: {
            code: 0,
            label: 'Draft'
        },
        proposal: {
            code: 1,
            label: 'Open for proposal'
        },
        approving: {
            code: 2,
            label: 'Approving'
        },
        solution: {
            code: 3,
            label: 'Open for solution'
        },
        closed: {
            code: 4,
            label: 'Closed'
        }
    }
}

const getCode = (type, statString) => {
    if (type === 'proposal') {
        for (let sKey of Object.keys(statusBank.proposal)) {
            if (statusBank.proposal[sKey].label === statString)
                return statusBank.proposal[sKey].code
        }
    } else if (type === 'request') {
        for (let sKey of Object.keys(statusBank.request)) {
            if (statusBank.request[sKey].label === statString)
                return statusBank.request[sKey].code
        }
    }

    return null // not found
}

const getLabel = (type, statCode) => {
    if (type === 'proposal') {
        for (let sKey of Object.keys(statusBank.proposal)) {
            if (statusBank.proposal[sKey].code === statCode) 
                return statusBank.proposal[sKey].label
        }
        
    } else if (type === 'request') {
        for (let sKey of Object.keys(statusBank.request)) {
            if (statusBank.request[sKey].code === statCode)
                return statusBank.request[sKey].label
        }
    }

    return null // not found
}

export {
    statusBank,
    getCode,
    getLabel
}