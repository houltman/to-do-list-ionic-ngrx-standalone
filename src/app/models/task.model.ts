export class Task {
    constructor(
        public _id?: string,
        public name?: string,
        public done?: boolean,
        public created_at?: string,
        public updated_at?: string
    ) {}
}
