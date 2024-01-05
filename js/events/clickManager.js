class ClickManager {

  scene;
  deleteMode = false;

  constructor(scene) {
    console.log(scene);
    this.scene = scene;
  }

  delete = (target) => {
    if (this.deleteMode) {
      console.log(target);
      target.destroy();
      this.deleteMode = false;
    }
  }

}

export { ClickManager };