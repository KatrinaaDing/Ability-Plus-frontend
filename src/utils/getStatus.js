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
        Object.keys(statusBank.proposal).forEach(sObj => {
            if (sObj.label === statString)
                return sObj.code
        })
    } else if (type === 'request') {
        Object.keys(statusBank.request).forEach(sObj => {
            if (sObj.label === statString)
                return sObj.code
        })
    }

    return null // not found
}

const getLabel = (type, statCode) => {
    if (type === 'proposal') {
        Object.keys(statusBank.proposal).forEach(sObj => {
            if (sObj.code === statCode)
                return sObj.label
        })
    } else if (type === 'request') {
        Object.keys(statusBank.request).forEach(sObj => {
            if (sObj.code === statCode)
                return sObj.label
        })
    }

    return null // not found
}

export {
    statusBank,
    getCode,
    getLabel
}