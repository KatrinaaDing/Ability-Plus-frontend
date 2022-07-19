export const categories = [
    'Frontend Develop',
    'Management',
    'Backend Develop',
    'Deployment/Infrastructure',
    'Algorithm',
    'Marketing',
    'Artificial Intelligence'
]

export const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)]