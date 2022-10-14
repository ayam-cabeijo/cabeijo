'use babel';

import CabeijoView from './cabeijo-view';
import { CompositeDisposable } from 'atom';

export default {

  cabeijoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cabeijoView = new CabeijoView(state.cabeijoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cabeijoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cabeijo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cabeijoView.destroy();
  },

  serialize() {
    return {
      cabeijoViewState: this.cabeijoView.serialize()
    };
  },

  toggle() {
    console.log('Cabeijo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
