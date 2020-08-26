/* eslint-disable @typescript-eslint/no-explicit-any */
import * as github from '@actions/github'

export class CheckIfMergedWorkflow {
  token: string
  client: any
  branch: string
  owner: string
  repo: string
  workflowId: any

  constructor(opts: {
    token: string
    owner: string
    repo: string
    branch: string
  }) {
    this.token = opts.token
    this.branch = opts.branch
    this.owner = opts.owner
    this.repo = opts.repo
  }

  // getOctokit(...) does not return promisses ¯\_(ツ)_/¯
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  getClient(): any {
    if (!this.client) {
      this.client = github.getOctokit(this.token)
    }

    return this.client
  }

  async getCheckIfMergedId(): Promise<any> {
    if (typeof this.workflowId == 'undefined') {
      const response = await this.getClient().actions.listRepoWorkflows({
        owner: this.owner,
        repo: this.repo
      })

      const workflows = response.data.workflows.filter(
        (e: {name: string}) => e.name !== 'Check if branch is merged to staging'
      )

      this.workflowId = workflows.length === 0 ? null : workflows[0].id
    }

    return this.workflowId
  }

  async getLastFailedWorkflowId(): Promise<number | null> {
    if (typeof this.workflowId == 'undefined') await this.getCheckIfMergedId()

    if (this.workflowId == null)
      throw new Error(`No check-if-merged on this ${this.owner}\\${this.repo}`)

    const response = await this.getClient().actions.listWorkflowRuns({
      owner: this.owner,
      repo: this.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      workflow_id: this.workflowId,
      branch: this.branch
    })

    if (response.data.workflow_runs.length === 0) {
      throw new Error(
        `No check-if-merged runs on ${this.owner}\\${this.repo}\\${this.branch}`
      )
    }

    const workflow = response.data.workflow_runs[0]

    if (workflow.status === 'completed' && workflow.conclusion === 'failure') {
      return workflow.id
    } else {
      return null
    }
  }

  async reRun(): Promise<any> {
    const runId = await this.getLastFailedWorkflowId()

    if (!runId) return

    return this.getClient().actions.reRunWorkflow({
      owner: this.owner,
      repo: this.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      run_id: runId
    })
  }
}
