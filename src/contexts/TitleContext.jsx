import React, {useState} from 'react';

const ChapterContext = React.createContext({})

export const ChapterProvider = ChapterContext.Provider
export const ChapterConsumer = ChapterContext.Consumer

export default ChapterContext

