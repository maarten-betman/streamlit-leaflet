import os
from typing import List

import streamlit.components.v1 as components

_RELEASE = False


if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_leaflet",
        url="http://localhost:3001",
    )
else:

    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_leaflet", path=build_dir)


def my_component(map_center: List, map_zoom: int = 13, key=None):
    return _component_func(map_center=map_center, map_zoom=map_zoom, key=key, default=0)


# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run streamlit_leaflet/__init__.py`
if not _RELEASE:
    import streamlit as st

    st.subheader("Component with constant args")
    coords = my_component(map_center=[51.505, -0.09], map_zoom=10, key=42)
    st.write(coords)
