/* eslint-disable no-useless-escape */
import React from 'react'

type GetComponentType = (value: React.ComponentType, props?: object) => React.ReactElement

export const GET_COMPONENT: GetComponentType = (Component, props = {}) => <Component {...props} />
