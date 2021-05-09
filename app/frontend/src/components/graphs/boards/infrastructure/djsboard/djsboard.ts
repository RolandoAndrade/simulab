import {Board} from "@/components/graphs/boards/domain/board";
//@ts-ignore
import Diagram from 'diagram-js';
//@ts-ignore
import ConnectModule from 'diagram-js/lib/features/connect';
//@ts-ignore
import ContextPadModule from 'diagram-js/lib/features/context-pad';
//@ts-ignore
import CreateModule from 'diagram-js/lib/features/create';
//@ts-ignore
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
//@ts-ignore
import ModelingModule from 'diagram-js/lib/features/modeling';
//@ts-ignore
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
//@ts-ignore
import MoveModule from 'diagram-js/lib/features/move';
//@ts-ignore
import OutlineModule from 'diagram-js/lib/features/outline';
//@ts-ignore
import PaletteModule from 'diagram-js/lib/features/palette';
//@ts-ignore
import ResizeModule from 'diagram-js/lib/features/resize';
//@ts-ignore
import RulesModule from 'diagram-js/lib/features/rules';
//@ts-ignore
import SelectionModule from 'diagram-js/lib/features/selection';
//@ts-ignore
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
//@ts-ignore
import ProvidersModule from './providers';

/**
 * A module that changes the default diagram look.
 */
const ElementStyleModule = {
    __init__: [
        [ 'defaultRenderer', function(defaultRenderer: any) {
            // override default styles
            defaultRenderer.CONNECTION_STYLE = { fill: 'none', strokeWidth: 2, stroke: '#000' };
            defaultRenderer.SHAPE_STYLE = { fill: 'white', stroke: '#000', strokeWidth: 2 };
            defaultRenderer.FRAME_STYLE = { fill: 'none', stroke: '#000', strokeDasharray: 4, strokeWidth: 2 };
        } ]
    ]
};


export class DJSBoard extends Board{
    private readonly diagram: typeof Diagram;

    constructor(container: HTMLElement) {
        super(container);
        // default modules provided by the toolbox
        const builtinModules = [
            ConnectModule,
            ContextPadModule,
            CreateModule,
            LassoToolModule,
            ModelingModule,
            MoveCanvasModule,
            MoveModule,
            OutlineModule,
            PaletteModule,
            ResizeModule,
            RulesModule,
            SelectionModule,
            ZoomScrollModule
        ];

        // our own modules, contributing controls, customizations, and more

        const customModules: any[] = [
            ProvidersModule,
            ElementStyleModule
        ];
        this.diagram = new Diagram(
            {
                canvas: {
                    container
                },
                modules: [
                    ...builtinModules,
                    ...customModules
                ]
            }
        );

        const canvas = this.diagram.get('canvas');
        const elementFactory = this.diagram.get('elementFactory');

        // add root
        var root = elementFactory.createRoot();

        canvas.setRootElement(root);

        // add shapes
        var shape1 = elementFactory.createShape({
            x: 150,
            y: 100,
            width: 100,
            height: 80
        });

        canvas.addShape(shape1, root);


        var shape2 = elementFactory.createShape({
            x: 290,
            y: 220,
            width: 100,
            height: 80
        });

        canvas.addShape(shape2, root);


        var connection1 = elementFactory.createConnection({
            waypoints: [
                { x: 250, y: 180 },
                { x: 290, y: 220 }
            ],
            source: shape1,
            target: shape2
        });

        canvas.addConnection(connection1, root);


        var shape3 = elementFactory.createShape({
            x: 450,
            y: 80,
            width: 100,
            height: 80
        });

        canvas.addShape(shape3, root);

        var shape4 = elementFactory.createShape({
            x: 425,
            y: 50,
            width: 300,
            height: 200,
            isFrame: true
        });

        canvas.addShape(shape4, root);


// (3) interact with the diagram via API

        const selection = this.diagram.get('selection');

        selection.select(shape3);
    }

}
