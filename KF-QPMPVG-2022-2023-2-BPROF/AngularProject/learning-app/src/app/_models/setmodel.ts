import { LearningSet } from "./learning-set"

export class SetModel {
    public set: LearningSet = new LearningSet()
    public ownerName: string = ''
    public alertColor: string = ''
    public action: string = ''
    public icon: string = ''
}