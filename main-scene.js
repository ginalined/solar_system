window.Assignment_Two_Test = window.classes.Assignment_Two_Test =
class Assignment_Two_Test extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,10,20 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );

        //let model_transform2= context.globals.graphics_state.camera_transform .times( Mat4.translation([100,50,20]) );
        this.initial_camera_location = Mat4.inverse( context.globals.graphics_state.camera_transform );
        //this.initial_camera_location = Mat4.inverse( model_transform2 );
                                       

        this.planet_1;


       

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );

        const shapes = { torus:  new Torus( 30, 30 ),
                         torus2: new ( Torus.prototype.make_flat_shaded_version() )( 15, 15 ),
                         sphere: new Subdivision_Sphere(4),
                         planet_1: new (Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
                         planet_2: new Subdivision_Sphere(3),
                         planet_3: new Subdivision_Sphere(4),
                         moon: new (Subdivision_Sphere.prototype.make_flat_shaded_version())(1),
                        planet_5: new (Grid_Sphere.prototype.make_flat_shaded_version())(8, 8)


 
                                // TODO:  Fill in as many additional shape instances as needed in this key/value table.
                                //        (Requirement 1)
                       }
        this.submit_shapes( context, shapes );
        this.hover=true;
                              

       // const t = this.t=graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;   
                        // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:0.5 } ),
            ring:     context.get_instance( Ring_Shader  ).material(),
            sun:     context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient:1 } ),
            plan1:     context.get_instance( Phong_Shader ).material( Color.of(0.77,0.77,0.77,1 ), { diffusivity : 1 } ),
            plan2:     context.get_instance( Phong_Shader ).material( Color.of( 0.25,0.4,0.14,1 ), { diffusivity : 0.2 ,specularity :1,gouraud: 1} ),
            plan2s:     context.get_instance( Phong_Shader ).material( Color.of( 0.25,0.4,0.14,1), { diffusivity : 0.2 ,specularity :1} ),
            plan3:      context.get_instance( Phong_Shader ).material( Color.of( 0.45,0.25,0.2,1 ), { diffusivity : 1 ,specularity :1} ),
            plan4:      context.get_instance( Phong_Shader ).material( Color.of(0.5,0.5,0.90196078,1 ), {  smoothness : 100,specularity :1 } ),
            plan5: context.get_instance( Phong_Shader ).material( Color.of( 0.6,0.6,0.6,1))

            
           
                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
          }

        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0, 1, 1, 1 ), 1000 ) ];
      }


    make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      { this.key_triggered_button( "View solar system",  [ "0" ], () => this.attached = () => this.initial_camera_location );
        this.new_line();
        this.key_triggered_button( "Attach to planet 1", [ "1" ], () => this.attached = () => this.planet_1 );
        this.key_triggered_button( "Attach to planet 2", [ "2" ], () => this.attached = () => this.planet_2 ); this.new_line();
        this.key_triggered_button( "Attach to planet 3", [ "3" ], () => this.attached = () => this.planet_3 );
        this.key_triggered_button( "Attach to planet 4", [ "4" ], () => this.attached = () => this.planet_4 ); this.new_line();
        this.key_triggered_button( "Attach to planet 5", [ "5" ], () => this.attached = () => this.planet_5 );
        this.key_triggered_button( "Attach to moon",     [ "m" ], () => this.attached = () => this.moon     );
      }
    display( graphics_state )
      { graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;
        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)

        let model_transform = Mat4.identity();


       

        

        //planet 1
        let model_transform1=model_transform.times( Mat4.translation([5*Math.sin(1.1*t), 0, 5*Math.cos(1.1*t)]) );
        this.shapes.planet_1.draw(graphics_state, model_transform1,this.materials.plan1);
        //model_transform1=model_transform1.times( Mat4.translation([0,0,-5]) );

        this.planet_1=model_transform1;

        //this.shapes.windmill.draw(graphics_state, model_transform1,this.materials.plan1);



        //planet 2
        let model_transform2=model_transform.times( Mat4.translation([8*Math.sin(1.05*t),0,8*Math.cos(1.05*t)]) );

        if (t%2==1)
        {
        this.shapes.planet_2.draw(graphics_state, model_transform2,this.materials.plan2);
      }
        else
        {
          this.shapes.planet_2.draw(graphics_state, model_transform2,this.materials.plan2s);
        }

        this.planet_2=model_transform2;



        //planet 3
        let model_transform3=model_transform.times( Mat4.translation([11*Math.sin(t),0,11*Math.cos(t)]) )
                          .times( Mat4.rotation( 0.5*Math.sin(t), Vec.of(0,1,0 )));
        this.shapes.planet_3.draw(graphics_state, model_transform3,this.materials.plan3);
        this.planet_3=model_transform3;
      model_transform3=model_transform3.times(Mat4.scale      ([ 1, 1, 0.2]) ); 
      //model_transform=model_transform3.times(Mat4.scale      ([ 1, 1, 0.5]) ); 
        
        //model_transform=model_transform3
        this.shapes.torus.draw(graphics_state, model_transform3,this.materials.ring);
  

        //planet 4
        model_transform=Mat4.identity();
        let model_transform4=model_transform.times( Mat4.translation([14*Math.sin(0.95*t),0,14*Math.cos(0.95*t)]) );

                                        
        this.shapes.planet_3.draw(graphics_state, model_transform4,this.materials.plan4);

        this.planet_4=model_transform4;


        //moon
        model_transform4=model_transform4.times( Mat4.rotation( 4*t, Vec.of(0,1,0 )));
        model_transform4=model_transform4.times( Mat4.translation([2.1,0,0]))
                                         

            
         this.shapes.moon.draw(graphics_state, model_transform4,this.materials.plan4);

         this.moon=model_transform4;


        //planet 5
        let model_transform5=model_transform.times( Mat4.translation([17*Math.sin(0.90*t),0,17*Math.cos(0.90*t)]) );
        this.shapes.planet_5.draw( graphics_state, model_transform5, this.materials.plan5);
        this.planet_5=model_transform5;




       
       // context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,10,20 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
       // this.initial_camera_location = Mat4.inverse( context.globals.graphics_state.camera_transform );

        model_transform = Mat4.identity();
        //model_transform=model_transform.times(Mat4.translation([0,0,0]));
        if(this.hover){
        this.t=t;
        this.lights = [ new Light( Vec.of( 0,0,0,1), Color.of( Math.abs(Math.sin((2*Math.PI)/10*t)), 0, Math.abs(Math.cos((2*Math.PI)/10*t)), 1 ), 10**(Math.abs(2*Math.sin((2*Math.PI)/10*t))+1)) ];
        model_transform=model_transform.times(Mat4.scale([ Math.abs(2*Math.sin((2*Math.PI)/10*t))+1, Math.abs(2*Math.sin((2*Math.PI)/10*t))+1, Math.abs(2*Math.sin((2*Math.PI)/10*t))+1 ]) ); 
        this.shapes.sphere.draw(graphics_state, model_transform,this.materials.sun.override({ color: Color.of(Math.abs(Math.sin((2*Math.PI)/10*t)),0,Math.abs(Math.cos((2*Math.PI)/10*t)),1)}));

      }
       

      if (this.attached)
      {
     // let mt=this.attached().times(Mat4.translation([0,0,5]));
      //graphics_state.camera_transform=Mat4.inverse(mt);
       var desired = Mat4.inverse(this.attached().times(Mat4.translation([0,0,5])));
          graphics_state.camera_transform = desired.map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x,0.1) );

      }
       

      
  }
}



// Extra credit begins here (See TODO comments below):

window.Ring_Shader = window.classes.Ring_Shader =
class Ring_Shader extends Shader              // Subclasses of Shader each store and manage a complete GPU program.
{ material() { return { shader: this } }      // Materials here are minimal, without any settings.
  map_attribute_name_to_buffer_name( name )       // The shader will pull single entries out of the vertex arrays, by their data fields'
    {                                             // names.  Map those names onto the arrays we'll pull them from.  This determines
                                                  // which kinds of Shapes this Shader is compatible with.  Thanks to this function, 
                                                  // Vertex buffers in the GPU can get their pointers matched up with pointers to 
                                                  // attribute names in the GPU.  Shapes and Shaders can still be compatible even
                                                  // if some vertex data feilds are unused. 
      return { object_space_pos: "positions" }[ name ];      // Use a simple lookup table.
    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
      { const proj_camera = g_state.projection_transform.times( g_state.camera_transform );
                                                                                        // Send our matrices to the shader programs:
        gl.uniformMatrix4fv( gpu.model_transform_loc,             false, Mat.flatten_2D_to_1D( model_transform.transposed() ) );
        gl.uniformMatrix4fv( gpu.projection_camera_transform_loc, false, Mat.flatten_2D_to_1D(     proj_camera.transposed() ) );
      }
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
              varying vec4 position;
              varying vec4 center;
      `;
    }
  vertex_glsl_code()           // ********* VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_transform;

        void main()
        { 
          //vec4( object_space_pos, 1)
         // gl_Position = projection_camera_transform * vec4(object_space_pos, 1.0); 
         gl_Position = projection_camera_transform*model_transform * vec4(object_space_pos, 1.0);
         position=model_transform * vec4(object_space_pos, 1.0);
         center=model_transform * vec4(0,0,0, 1.0);

         //0.45,0.25,0.2,1
       


        }`;           // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER *********
    { return `
        void main()
        { 
           //dist[i]  = lightPosition[i].w > 0.0 ? distance((camera_transform * lightPosition[i]).xyz, screen_space_pos)
             //                                   : distance( attenuation_factor[i] * -lightPosition[i].xyz, object_space_pos.xyz );
          float ds=0.0;
          ds=distance(position,center);
          gl_FragColor = vec4(0.45*(sin(ds*25.0)),0.25*(sin(ds*25.0)),0.2*(sin(ds*25.0)),1.0);
    

          
        }`;           // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
    }
}

window.Grid_Sphere = window.classes.Grid_Sphere =
class Grid_Sphere extends Shape           // With lattitude / longitude divisions; this means singularities are at 
  { constructor( rows, columns, texture_range )             // the mesh's top and bottom.  Subdivision_Sphere is a better alternative.
      { super( "positions", "normals", "texture_coords" );

       const cp = Array( rows ).fill( Vec.of( 0,0,-1 ) )
                                           .map( (p,i,a) => Mat4.translation([ 0,0,0 ])
                                                    .times( Mat4.rotation( i/(a.length-1) * Math.PI, Vec.of( 0,-1,0 ) ) )
                                                    .times( p.to4(1) ).to3() );

        Surface_Of_Revolution.insert_transformed_copy_into( this, [ rows, columns, cp] );  
        

                      // TODO:  Complete the specification of a sphere with lattitude and longitude lines
                      //        (Extra Credit Part III)
      } }