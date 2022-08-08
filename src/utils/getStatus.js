/**
 * Author: Ziqi Ding
 * Created At: 12 Jul 2022
 * Description: A convertor of status code and string for proposals and project challenges
 */
const statusBank = {
    proposal: {
        draft: {
            code: 0,
            label: 'draft'
        },
        submitted: {
            code: 1,
            label: 'submitted'
        },
        approving: {
            code: 2,
            label: 'approving'
        },
        approved: {
            code: 3,
            label: 'approved'
        },
        rejected: {
            code: 4,
            label: 'rejected'
        }
    },
    request: {
        draft: {
            code: 0,
            label: 'draft'
        },
        proposal: {
            code: 1,
            label: 'open_for_proposal'
        },
        approving: {
            code: 2,
            label: 'approving'
        },
        solution: {
            code: 3,
            label: 'open_for_solution'
        },
        closed: {
            code: 4,
            label: 'closed'
        }
    }
}

// get the code for any status label
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

// get the label of any status code
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

// format any label
const formatLabel = (label) => {
    if (label === 'all') return ''
    return label = label.split('_').join(' ')
}

export {
    statusBank,
    getCode,
    getLabel,
    formatLabel
}