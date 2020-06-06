
import React, { useState } from "react";
import Node from "../Node/Node";
import "./grid.css";
import {dijkstraAlgorithms, getNodeInshortestPathOrder} from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function Grid() {
    console.log('start Grid Function');
    const [mouseispressed, setmousePress] = useState(false);
    const [startNodePressded, setStartpress] = useState(false);
    const [FinishingNodePressded,setFinishPress] = useState(false);
    // console.log("current mouse press in main  app", mouseispressed);
    // console.log("current mosue is release in main app", !mouseispressed);
    
    function onMouseDown(row, col) {
        //  console.log('start down app');
        createWall(grid, row, col);
        setmousePress(true);
        //console.log("main app wall need to be true when marked, otherwise false", row, col, grid[row][col].isWall);  
        return grid[row][col];
        // console.log('mousepressed app handleMouseDown true when press otherwise',mouseIsPressed );
        // console.log('end down app');
        
    }
    function handleMouseup() {
        //console.log('start up app'); 
        setmousePress(false);
        //console.log('mouse is released', mouseispressed);   
        //console.log('end up app');

    }
    function handleMouseEnter(row, col) {
        //console.log('start app enter');
        if (!mouseispressed) {
           // console.log("main app wall need to be true when marked, otherwise false",row, col , grid[row][col].isWall);
           // console.log(grid[row][col]);
            return;
        }
         createWall(grid, row, col);
        // console.log('mouse is app press', mouseispressed);
       // console.log("main app wall need to be true when marked, otherwise false", row, col , grid[row][col].isWall);
        // console.log('end app enter');
        return mouseispressed;
    }
    function animationshortestPath(nodesInshortestpathOrder){
        for (let i = 0 ; i < nodesInshortestpathOrder.length; i++){
            setTimeout(()=> {
                const node = nodesInshortestpathOrder[i];

                if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';

                }
                else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                }
                else {
                document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';}

            }, 50*i);
        }

    }
    function animationFindingPath(visitedNodesInorder, nodesInshortestpathOrder ){
        for (let i = 0 ; i <= visitedNodesInorder.length; i++){
            if (i === visitedNodesInorder.length){
                setTimeout(()=> {
                    animationshortestPath(nodesInshortestpathOrder);
                }, 10* i);
                return;
            }

            setTimeout(()=>{
                const node = visitedNodesInorder[i];
                if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                  
                }
                else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                }
                else{
                document.getElementById(`node-${node.row}-${node.col}`).className ='node node-visited';}
            }, 10*i);
        }
    }
    function handleDijkstra(){
        console.log("Call algorithm");
       
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInorder = dijkstraAlgorithms(grid, startNode, finishNode);
        const nodesInshortestpathOrder = getNodeInshortestPathOrder(finishNode);
        animationFindingPath(visitedNodesInorder, nodesInshortestpathOrder);
        
    }
    function handleSetStart(){
        console.log("wait for setting starting node");
        setStartpress(true);
        console.log("starting node is set");
        
    }
    function handleSetFinish(){
        console.log("waiting for setting finish node");
        setFinishPress(true);
        console.log("finishing node is set");
        
    }
    function handleClearWall(grid){
        console.log("clear wall");
        setTimeout(() => {
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 50; col++) {
                    if (row === START_NODE_ROW && col === START_NODE_COL){
                        document.getElementById(`node-${row}-${col}`).className = 'node node-start';
                        continue;
                    }
                    if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL){ 
                        document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
                        
                        continue;}

                     document.getElementById(`node-${row}-${col}`).className = 'node';
                }
            }
        });
       
        
    }
    return (
    <>
           <div  className="navigationTab">
                <button onClick={handleDijkstra}> Dijkstra's Algorithm</button>
                <button onClick={handleSetStart}>  Start Destination</button>
                <button onClick={handleSetFinish}> End Destination</button>
                <button onClick={handleClearWall}> Clear all wall</button>
           </div> 
    
    
    <div className="grid"  >
        {grid.map((row, rowIdx) => {
            return (
                <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                        const {
                            row,
                            col,
                            isFinish,
                            isStart,
                            isWall,
                        } = node;
                        return (
                            <Node
                                key={nodeIdx}
                                isStart={isStart}
                                isFinish={isFinish}
                                isWall={isWall}
                                row={row}
                                col={col}
                                mouseispressed={mouseispressed}
                                onMouseDown={onMouseDown}
                                onMouseUp={handleMouseup}
                                onMouseEnter={handleMouseEnter}
                            > </Node>
                        );
                    })}

                </div>
            );
        })}



    </div></>
    )
}



const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode = (row, col) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        isclear:false,
    };
};

const createWall = (grid, row, col) => {
    // const newGrid = grid.slice();
    const asNode = grid[row][col];
    const newNode = {
        ...asNode,
        isWall: !(asNode.isWall),

    };
    // // newGrid[row][col] = newNode;
    // return newGrid[row][col];
    grid[row][col] = newNode;

};

const grid = getInitialGrid();
export default Grid ;