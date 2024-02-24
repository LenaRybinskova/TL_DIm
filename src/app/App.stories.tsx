 import type {Meta, StoryObj}   from  '@storybook/react';
 import App from './App';
 import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';



const  meta: Meta<  typeof  App> = {
    title:   'TODOLISTS/App',
    component:   App,
    tags: [  'autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default  meta;
type Story = StoryObj<  typeof  App>;

export const  AppWithReduxStory: Story = {}






// старый вариант написания
/*
import {Meta, Story} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';


const meta: Meta = {
    title: 'TODOLIST/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    decorators:[ReduxStoreProviderDecorator] // все истории попадут внутрь декоратора и вызовутся там
};
export default meta;

const Template: Story = () => <App />;

// история
export const BaseExampleAppWithRedux = Template.bind({})
BaseExampleAppWithRedux.args={}
*/
