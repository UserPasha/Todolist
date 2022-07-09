import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";;



export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
   //Using without <Provider>, using with decorator: ReduxStoreProviderDecorator
decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux  />;

export const AppWithReduxStories = Template.bind({});

AppWithReduxStories.args = {
    onChange: action("Value was changed")
};



