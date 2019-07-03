import domains from '../config/domain'
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { GraphQLClient } from 'graphql-request'

function getDomain (initDomains: any[]): string | never{
  const location = window.location.host
  const matchDomain = initDomains.find(({ host }) => host.test(location))
  if (matchDomain) {
    return matchDomain.domain
  } else {
    throw new Error('Can not match the domain! Please check your domain config.')
  }
}
const domain = getDomain(domains)

const createRequest = (baseURL: string, suffix: string) =>
  axios.create({
    baseURL: `${baseURL}/${suffix}`,
    timeout: 2000
  })
const createGraphQL = (baseURL: string, suffix: string) => new GraphQLClient(`${baseURL}${suffix}`)

interface Files {
  [propName: string]: string
}
interface RequestInit {
  baseURL: string
  requestSuffix: string
  graphqlSuffix: string
}
interface RequestConfig {
  method: string
  url: string
}
interface RequestObject {
  [propName: string]: RequestConfig
}

interface Apis {
  [propName: string]: (data: any) => AxiosPromise<any>
}

interface Res {
  headers: any
  [propName: string]: any
}

interface Graphqls {
  [propName: string]: (vars?: object) => Promise<Res>
}

class Request {
  public request: AxiosInstance
  public graphQL: GraphQLClient
  public apis: Apis
  public graphqls: Graphqls
  constructor ({ baseURL, requestSuffix, graphqlSuffix }: RequestInit) {
    this.request = createRequest(baseURL, requestSuffix)
    this.graphQL = createGraphQL(baseURL, graphqlSuffix)
    this.apis = {}
    this.graphqls = {}
  }

  public addApis = (requestObject: RequestObject) => {
    const apis: Apis = {}
    Object.keys(requestObject).forEach((key: string) => {
      apis[key] = this.createRequestPackage(requestObject[key])
    })
    if (this.apis) {
      Object.assign(this.apis, apis)
    } else {
      this.apis = apis
    }
  }

  public addGraphql = (files: Files) => {
    const graphqls: Graphqls = {}
    Object.keys(files).forEach((key: string) => {
      graphqls[key] = this.createGraphqlPackage(files[key])
    })
    if (this.graphqls) {
      Object.assign(this.graphqls, graphqls)
    } else {
      this.graphqls = graphqls
    }
  }

  protected createRequestPackage = (requestConfig: RequestConfig) => {
    const { method, url } = requestConfig
    const request = (data: any) =>
      this.request({
        method,
        url,
        data: method === 'post' ? data : null,
        params: method === 'get' ? data : null
      })
    return request
  }

  protected createGraphqlPackage = (file: string) => (vars?: object) => {
    return this.graphQL.rawRequest(file, vars).then(({ data, headers, status }) => {
      const obj: Res = { headers, ...data }
      return obj
    })
  }
}
export default Request
export { domain }
