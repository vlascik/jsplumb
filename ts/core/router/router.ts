import {Connection} from '../connector/connection-impl'
import { Endpoint } from '../endpoint/endpoint'
import { PointXY } from '../common'
import {Anchor} from "../anchor/anchor"
import {AnchorComputeParams, AnchorSpec, Orientation} from "../factory/anchor-factory"

export interface RedrawResult {
    c:Set<Connection>
    e:Set<Endpoint>
}

export type AnchorPlacement = [ number, number, number, number, number?, number? ]

export interface Router<T extends {E:unknown}> {

    reset ():void

    redraw (elementId:string, timestamp?:string, offsetToUI?:PointXY):RedrawResult

    computePath(connection:Connection, timestamp:string):void
    computeAnchorLocation(anchor:Anchor, params:AnchorComputeParams):AnchorPlacement

    getEndpointLocation(endpoint: Endpoint<any>, params:AnchorComputeParams): AnchorPlacement

    // TODO does this definitely have to be exposed, or does all the code that calls it now site inside router?
    getAnchorOrientation(anchor:Anchor, endpoint?: Endpoint): Orientation
    getEndpointOrientation(endpoint: Endpoint): Orientation

    prepareAnchor(endpoint:Endpoint, params:AnchorSpec | Array<AnchorSpec>):Anchor

}
