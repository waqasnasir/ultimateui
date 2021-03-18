export const getExprListById = (intents, id) => {
    let expressionList = [];
    const intent = intents.find(int => int.id === id);
    if (intent && intent.expressionList) {
        expressionList = intent.expressionList || [];
    }
    return expressionList;
}