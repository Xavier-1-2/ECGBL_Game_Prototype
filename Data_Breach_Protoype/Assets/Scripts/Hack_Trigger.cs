using UnityEngine;

public class Hack_Trigger : MonoBehaviour
{
    [SerializeField] private GameObject Displaytext;
    //private bool playerInRange;

    void Start()
    {
    }

    void Update()
    {
        

    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        //playerInRange = true;
        if (other.CompareTag("Player"))
        {
            if (Displaytext != null)
                Displaytext.SetActive(true);
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            //playerInRange = false;

            if (Displaytext != null)
                Displaytext.SetActive(false);
        }
    }
}
